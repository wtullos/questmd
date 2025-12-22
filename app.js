// Questionnaire App - Main Logic
class QuestionnaireApp {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.answers = {};
        this.originalMarkdown = '';
        this.metadata = {};
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('file-input').addEventListener('change', (e) => this.handleFileUpload(e));
        document.getElementById('load-btn').addEventListener('click', () => this.loadFromTextarea());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('download-btn').addEventListener('click', () => this.downloadMarkdown());
        document.getElementById('email-btn').addEventListener('click', () => this.emailResults());
        document.getElementById('start-over-btn').addEventListener('click', () => this.startOver());
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.originalMarkdown = e.target.result;
            this.parseMarkdown(this.originalMarkdown);
        };
        reader.readAsText(file);
    }

    loadFromTextarea() {
        const markdown = document.getElementById('markdown-input').value;
        if (!markdown.trim()) {
            alert('Please paste or upload a markdown questionnaire file.');
            return;
        }
        this.originalMarkdown = markdown;
        this.parseMarkdown(markdown);
    }

    parseMarkdown(markdown) {
        // Extract frontmatter if present
        const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            frontmatter.split('\n').forEach(line => {
                const match = line.match(/^(\w+):\s*(.+)$/);
                if (match) {
                    this.metadata[match[1]] = match[2];
                }
            });
        }

        // Remove frontmatter for parsing
        const content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');

        // Split into sections
        const sections = content.split(/(?=^##\s)/m).filter(s => s.trim());
        
        this.questions = [];
        let questionId = 0;

        sections.forEach(section => {
            const sectionMatch = section.match(/^##\s+(.+?)$/m);
            const sectionTitle = sectionMatch ? sectionMatch[1] : 'Untitled Section';

            // Use regex to find all questions in this section
            // Pattern: number. question text, then either Answer: or sub-items
            const questionBlocks = section.split(/(?=^\d+\.\s)/m).filter(b => b.trim() && b.match(/^\d+\./));
            
            questionBlocks.forEach(block => {
                const lines = block.split('\n');
                const firstLine = lines[0];
                const questionMatch = firstLine.match(/^(\d+)\.\s+(.+)$/);
                
                if (!questionMatch) return;
                
                const questionNum = questionMatch[1];
                let questionText = questionMatch[2].trim();
                
                // Check for multipart question (has sub-items with dashes)
                const multipartMatch = block.match(/^\s+-\s+\*\*(.+?)\*\*\s*—\s*Answer:/gm);
                if (multipartMatch) {
                    // Extract main question text (everything before first dash)
                    const mainTextMatch = block.match(/^\d+\.\s+(.+?)(?=\n\s+-\s+\*\*)/s);
                    if (mainTextMatch) {
                        questionText = mainTextMatch[1].trim();
                    }
                    
                    const parts = [];
                    multipartMatch.forEach((match, idx) => {
                        const partMatch = match.match(/^\s+-\s+\*\*(.+?)\*\*\s*—\s*Answer:/);
                        if (partMatch) {
                            // Extract answer - could be on same line or next line
                            const matchIndex = block.indexOf(match);
                            const afterMatch = block.substring(matchIndex + match.length);
                            // Get answer until next dash or end
                            const answerMatch = afterMatch.match(/^\s*(.+?)(?=\n\s+-\s+\*\*|\n\n|$)/s);
                            const existingAnswer = answerMatch ? answerMatch[1].trim() : '';
                            
                            parts.push({
                                label: partMatch[1],
                                id: `${questionId}-${idx}`,
                                existingAnswer: existingAnswer
                            });
                        }
                    });
                    
                    this.questions.push({
                        id: questionId++,
                        section: sectionTitle,
                        number: questionNum,
                        text: questionText,
                        type: 'multipart',
                        parts: parts
                    });
                }
                // Check for checkbox question
                else if (block.match(/^\s+-\s+\[ \]\s+/m)) {
                    const checkboxLines = block.match(/^\s+-\s+\[ \]\s+(.+)$/gm);
                    if (checkboxLines) {
                        // Extract main question text
                        const mainTextMatch = block.match(/^\d+\.\s+(.+?)(?=\n\s+-\s+\[ \])/s);
                        if (mainTextMatch) {
                            questionText = mainTextMatch[1].trim();
                        }
                        
                        const options = checkboxLines.map(line => {
                            return line.replace(/^\s+-\s+\[ \]\s+/, '').trim();
                        });
                        
                        this.questions.push({
                            id: questionId++,
                            section: sectionTitle,
                            number: questionNum,
                            text: questionText,
                            type: 'checkbox',
                            options: options
                        });
                    }
                }
                // Regular text question
                else {
                    // Extract existing answer if present
                    const answerMatch = block.match(/^\s+\*\*Answer:\*\*\s*(.+?)(?=\n\n|\n---|$)/s);
                    const existingAnswer = answerMatch ? answerMatch[1].trim() : '';
                    
                    // Clean question text (remove answer part)
                    questionText = questionText.split(/\*\*Answer:\*\*/)[0].trim();
                    
                    this.questions.push({
                        id: questionId++,
                        section: sectionTitle,
                        number: questionNum,
                        text: questionText,
                        type: 'text',
                        existingAnswer: existingAnswer
                    });
                }
            });
        });

        // Initialize answers object with existing answers if present
        this.questions.forEach(q => {
            if (q.type === 'checkbox') {
                this.answers[q.id] = {};
                q.options.forEach((opt, idx) => {
                    this.answers[q.id][idx] = false;
                });
            } else if (q.type === 'multipart') {
                this.answers[q.id] = {};
                q.parts.forEach(part => {
                    this.answers[q.id][part.id] = part.existingAnswer || '';
                });
            } else {
                this.answers[q.id] = q.existingAnswer || '';
            }
        });

        this.currentIndex = 0;
        this.showQuestionnaire();
    }

    showQuestionnaire() {
        document.getElementById('upload-section').classList.add('hidden');
        document.getElementById('questionnaire-section').classList.remove('hidden');
        document.getElementById('completion-section').classList.add('hidden');
        
        this.updateProgress();
        this.renderQuestion();
    }

    updateProgress() {
        const progress = ((this.currentIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('current-question-num').textContent = this.currentIndex + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
    }

    renderQuestion() {
        const question = this.questions[this.currentIndex];
        const container = document.getElementById('question-container');
        
        let html = `<div class="question-item">`;
        html += `<div class="section-header">${question.section}</div>`;
        html += `<div class="question-text">${this.formatQuestionText(question.text)}</div>`;

        if (question.type === 'checkbox') {
            html += `<div class="checkbox-group">`;
            question.options.forEach((option, idx) => {
                const checked = this.answers[question.id][idx] ? 'checked' : '';
                html += `
                    <div class="checkbox-item">
                        <input type="checkbox" id="opt-${question.id}-${idx}" ${checked} 
                               onchange="app.updateCheckboxAnswer(${question.id}, ${idx}, this.checked)">
                        <label for="opt-${question.id}-${idx}">${option}</label>
                    </div>
                `;
            });
            html += `</div>`;
        } else if (question.type === 'multipart') {
            question.parts.forEach(part => {
                html += `<div style="margin-bottom: 15px;">`;
                html += `<label style="display: block; margin-bottom: 5px; font-weight: 600;">${part.label}:</label>`;
                html += `<textarea id="part-${part.id}" 
                          oninput="app.updateMultipartAnswer('${question.id}', '${part.id}', this.value)"
                          style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #ddd; border-radius: 6px;">${this.answers[question.id][part.id] || ''}</textarea>`;
                html += `</div>`;
            });
        } else {
            html += `<textarea id="answer-${question.id}" 
                      oninput="app.updateAnswer(${question.id}, this.value)"
                      style="width: 100%; min-height: 120px; padding: 12px; border: 2px solid #ddd; border-radius: 6px;">${this.answers[question.id] || ''}</textarea>`;
        }

        html += `</div>`;
        container.innerHTML = html;

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = this.currentIndex === 0;
        document.getElementById('next-btn').textContent = 
            this.currentIndex === this.questions.length - 1 ? 'Finish →' : 'Next →';
        
        // Add keyboard shortcuts after rendering
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        const container = document.getElementById('question-container');
        
        // Add keyboard event listener to the question container
        container.addEventListener('keydown', (e) => {
            const isTextarea = e.target.tagName === 'TEXTAREA';
            const isCheckbox = e.target.type === 'checkbox';
            
            // Ctrl+Enter or Shift+Enter = next question (works everywhere including textareas)
            if ((e.ctrlKey || e.shiftKey) && e.key === 'Enter') {
                e.preventDefault();
                this.nextQuestion();
            }
            // Enter key on checkboxes = next question
            else if (e.key === 'Enter' && isCheckbox) {
                e.preventDefault();
                this.nextQuestion();
            }
            // Enter key on textarea without modifiers = allow normal behavior (new line)
            // Arrow keys with Ctrl/Cmd for navigation
            else if (e.key === 'ArrowLeft' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.prevQuestion();
            }
            else if (e.key === 'ArrowRight' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.nextQuestion();
            }
        });

        // Focus the first textarea for better UX (skip checkboxes)
        const firstTextarea = container.querySelector('textarea');
        if (firstTextarea) {
            // Small delay to ensure DOM is ready
            setTimeout(() => firstTextarea.focus(), 100);
        }
    }

    formatQuestionText(text) {
        // Convert markdown bold to HTML
        return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }

    updateAnswer(questionId, value) {
        this.answers[questionId] = value;
    }

    updateCheckboxAnswer(questionId, optionIndex, checked) {
        this.answers[questionId][optionIndex] = checked;
    }

    updateMultipartAnswer(questionId, partId, value) {
        this.answers[questionId][partId] = value;
    }

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.renderQuestion();
            this.updateProgress();
        } else {
            this.completeQuestionnaire();
        }
    }

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderQuestion();
            this.updateProgress();
        }
    }

    completeQuestionnaire() {
        document.getElementById('questionnaire-section').classList.add('hidden');
        document.getElementById('completion-section').classList.remove('hidden');
        
        const markdown = this.generateMarkdown();
        document.getElementById('preview-content').textContent = markdown;
    }

    generateMarkdown() {
        let markdown = '';
        
        // Add frontmatter if it existed
        if (Object.keys(this.metadata).length > 0) {
            markdown += '---\n';
            Object.entries(this.metadata).forEach(([key, value]) => {
                markdown += `${key}: ${value}\n`;
            });
            markdown += '---\n\n';
        }

        // Group questions by section
        const sections = {};
        this.questions.forEach(q => {
            if (!sections[q.section]) {
                sections[q.section] = [];
            }
            sections[q.section].push(q);
        });

        // Generate markdown for each section
        Object.entries(sections).forEach(([sectionTitle, questions]) => {
            markdown += `## ${sectionTitle}\n\n`;
            
            questions.forEach(q => {
                markdown += `${q.number}. ${q.text}\n\n`;
                
                if (q.type === 'checkbox') {
                    const checkedOptions = [];
                    q.options.forEach((opt, idx) => {
                        if (this.answers[q.id][idx]) {
                            checkedOptions.push(opt);
                        }
                    });
                    
                    if (checkedOptions.length > 0) {
                        markdown += `   **Answer:** ${checkedOptions.join(', ')}\n\n`;
                    } else {
                        markdown += `   **Answer:**\n\n`;
                    }
                } else if (q.type === 'multipart') {
                    q.parts.forEach(part => {
                        const answer = this.answers[q.id][part.id] || '';
                        markdown += `   - **${part.label} — Answer:** ${answer}\n\n`;
                    });
                } else {
                    const answer = this.answers[q.id] || '';
                    markdown += `   **Answer:** ${answer}\n\n`;
                }
            });
            
            markdown += '---\n\n';
        });

        return markdown.trim();
    }

    downloadMarkdown() {
        const markdown = this.generateMarkdown();
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'questionnaire-answers.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    emailResults() {
        const markdown = this.generateMarkdown();
        const subject = encodeURIComponent('Questionnaire Answers');
        const body = encodeURIComponent(markdown);
        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    }

    startOver() {
        this.currentIndex = 0;
        this.answers = {};
        this.questions.forEach(q => {
            if (q.type === 'checkbox') {
                this.answers[q.id] = {};
                q.options.forEach((opt, idx) => {
                    this.answers[q.id][idx] = false;
                });
            } else if (q.type === 'multipart') {
                this.answers[q.id] = {};
                q.parts.forEach(part => {
                    this.answers[q.id][part.id] = '';
                });
            } else {
                this.answers[q.id] = '';
            }
        });
        
        document.getElementById('completion-section').classList.add('hidden');
        document.getElementById('questionnaire-section').classList.remove('hidden');
        this.updateProgress();
        this.renderQuestion();
    }
}

// Initialize app
const app = new QuestionnaireApp();

// Make app globally available for inline handlers
window.app = app;

