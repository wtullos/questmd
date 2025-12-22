# 📋 QuestMD

**QuestMD** (Questionnaire Markdown) - Turn your markdown questionnaires into beautiful, interactive forms. Perfect for surveys, assessments, or any structured Q&A.

🌐 **[Try QuestMD Live →](https://wtullos.github.io/questmd/)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 📝 **Parse markdown questionnaires** - Upload or paste your `.md` files
- 🎯 **One question at a time** - Focused experience with progress tracking
- ✅ **Multiple question types** - Text, checkboxes, and multi-part questions
- 💾 **Download results** - Get clean markdown output perfect for Notion
- 📧 **Email support** - Send results directly to yourself
- 🎨 **Beautiful UI** - Modern, responsive design
- 🚀 **Zero dependencies** - Pure HTML/CSS/JavaScript, no build process needed

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

## 🛠️ Development

This is a pure client-side application with no build process:

- `index.html` - Main application structure
- `styles.css` - All styling
- `app.js` - Application logic and markdown parsing

## 📄 License

MIT License - feel free to use this for personal or commercial projects!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share your use cases

## 💡 Use Cases

- Surveys and assessments
- Employee questionnaires
- Client intake forms
- Research questionnaires
- Any structured Q&A that needs to be converted to markdown

---

Made with ❤️ for better markdown workflows
