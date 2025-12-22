# 📋 QuestMD - Markdown Questionnaire Builder

**QuestMD** (Questionnaire Markdown) - A free, open-source tool to convert markdown questionnaires into beautiful, interactive web forms. Perfect for creating surveys, health assessments, employee questionnaires, client intake forms, and any structured Q&A workflow.

🌐 **[Try QuestMD Live →](https://wtullos.github.io/questmd/)** - No installation required!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is QuestMD?

QuestMD is a lightweight, client-side web application that transforms markdown-formatted questionnaires into user-friendly, interactive forms. Built with vanilla JavaScript, HTML, and CSS—no frameworks, no build process, no dependencies. Simply upload your markdown file or paste it directly, answer questions one at a time with progress tracking, and export clean markdown output perfect for Notion, documentation, or further processing.

**Keywords:** markdown questionnaire, interactive form builder, survey tool, markdown to form converter, questionnaire generator, health assessment form, client intake form, markdown parser, web form builder, open source questionnaire tool

## ✨ Features

- 📝 **Markdown Questionnaire Parser** - Upload or paste your `.md` files with automatic question detection
- 🎯 **One Question at a Time** - Focused, distraction-free experience with progress tracking
- ✅ **Multiple Question Types** - Supports text inputs, checkboxes, and multi-part questions
- 💾 **Export to Markdown** - Download clean, formatted markdown output perfect for Notion, Obsidian, or any markdown editor
- 📧 **Email Results** - Send completed questionnaires directly to yourself via email
- ⌨️ **Keyboard Shortcuts** - Navigate with Ctrl+Enter, Shift+Enter, and arrow keys for faster completion
- 🎨 **Modern UI** - Beautiful, responsive design that works on desktop and mobile
- 🚀 **Zero Dependencies** - Pure HTML/CSS/JavaScript - no npm, no build process, no frameworks
- 🔒 **Privacy-First** - All processing happens client-side - your data never leaves your browser
- 📱 **Mobile-Friendly** - Responsive design works seamlessly on phones and tablets

## 🚀 Quick Start

### Option 1: Use the Live Demo
🌐 **[Try QuestMD Live →](https://wtullos.github.io/questmd/)**  
- no installation needed!

### Option 2: Run Locally
1. Clone this repository: `git clone https://github.com/wtullos/questmd.git`
2. Open `index.html` in your web browser
3. That's it! No build process needed.

## 📖 How to Use

1. **Load your questionnaire**: 
   - Upload a `.md` file, OR
   - Paste markdown directly into the textarea
2. **Answer questions**: Use Next/Previous buttons to navigate through questions
3. **Download or Email**: When finished, download the markdown file or email it to yourself
4. **Import to Notion**: Paste the clean markdown output directly into Notion

## 📝 Markdown Format

QuestMD expects questionnaires in this format:

```markdown
---
title: My Questionnaire
---

## Section Name
1. **Question text here?**

   **Answer:** [your answer]

2. **Multi-part question:**
   - **Part 1 — Answer:** [answer]
   - **Part 2 — Answer:** [answer]

3. **Checkbox question:**
   - [ ] Option 1
   - [ ] Option 2
   - [ ] Option 3

   **Answer:** [selected options]

---
```

## 🌐 Hosting Options

- **GitHub Pages**: Already configured! Just enable Pages in your repo settings
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repo
- **Any web server**: Upload the files - no server-side code needed

## 🛠️ Technical Details

QuestMD is built with vanilla web technologies - no frameworks, no build tools, no dependencies:

- **Frontend:** Pure HTML5, CSS3, and JavaScript (ES6+)
- **Markdown Parsing:** Custom regex-based parser for questionnaire format
- **Storage:** Browser localStorage for session persistence
- **File Handling:** HTML5 File API for markdown file uploads
- **Export:** Blob API for markdown file downloads

### Project Structure

- `index.html` - Main application structure and UI
- `styles.css` - All styling and responsive design
- `app.js` - Application logic, markdown parsing, and form handling

### Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - feel free to use this for personal or commercial projects!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share your use cases

## 💡 Use Cases & Examples

QuestMD is perfect for:

- **Health Assessments** - Create detailed health questionnaires and intake forms
- **Employee Surveys** - HR questionnaires, feedback forms, onboarding surveys
- **Client Intake Forms** - Professional service intake questionnaires
- **Research Questionnaires** - Academic research data collection forms
- **Event Registration** - Custom registration forms with structured questions
- **Application Forms** - Job applications, program applications, membership forms
- **Feedback Forms** - Customer feedback, product feedback, service evaluation
- **Educational Assessments** - Student evaluations, course feedback forms
- **Any Structured Q&A** - Convert any markdown questionnaire into an interactive form

### Why Use QuestMD?

- **No Account Required** - Use it immediately without signing up
- **Works Offline** - Download and use locally without internet
- **Privacy-Focused** - Your data stays in your browser
- **Easy Integration** - Export to Notion, Obsidian, or any markdown-compatible tool
- **Version Control Friendly** - Store questionnaires as markdown files in Git
- **Customizable** - Open source code you can modify for your needs

## 🔍 Related Tools & Alternatives

QuestMD fills a unique niche - converting markdown questionnaires to interactive forms. If you're looking for:
- **Form Builders:** Google Forms, Typeform, JotForm
- **Markdown Editors:** Obsidian, Notion, Markdown editors
- **Survey Tools:** SurveyMonkey, Qualtrics, LimeSurvey
- **Questionnaire Converters:** QuestMD (this tool!)

## 📚 Learn More

- **Markdown Guide:** [Markdown Syntax](https://www.markdownguide.org/)
- **Notion Integration:** Export completed forms directly to Notion databases
- **GitHub Pages:** Host your own instance for free

## 🌟 Star This Repo

If QuestMD helps you, please consider giving it a ⭐ on GitHub! It helps others discover this tool.

---

**Made with ❤️ for better markdown workflows**

**Tags:** `markdown` `questionnaire` `survey` `form-builder` `interactive-forms` `markdown-parser` `web-app` `vanilla-javascript` `open-source` `notion` `client-side` `privacy-focused`
