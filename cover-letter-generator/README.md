# 📝 Cover Letter Generator

An intelligent tool that adapts your existing cover letter for new job opportunities. Simply provide an example cover letter and a new job description, and get a tailored cover letter instantly!

## ✨ Features

- **Multiple Input Formats**: Upload PDF, DOCX, or plain text files, or paste text directly
- **AI-Powered Adaptation**: Uses Claude (Anthropic) or GPT (OpenAI) to intelligently adapt your cover letter
- **Multiple Output Formats**: Download as TXT, DOCX, or PDF
- **Drag & Drop Interface**: User-friendly web interface with drag-and-drop support
- **No Data Storage**: All processing happens locally and in-memory
- **Works Offline**: Basic template generation works without AI API (AI recommended for best results)

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)

**macOS/Linux:**
```bash
cd cover-letter-generator
./start.sh
```

**Windows:**
```cmd
cd cover-letter-generator
start.bat
```

The script will automatically:
1. Install all Python dependencies
2. Start the backend server
3. Open the web interface in your browser

### Option 2: Manual Setup

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

   If you encounter permission errors:
   ```bash
   pip install -r requirements.txt --break-system-packages
   ```

2. **Start the Server:**
   ```bash
   python3 server.py
   ```

3. **Open the Web Interface:**
   - Open `index.html` in your browser
   - Or navigate to: `file:///path/to/cover-letter-generator/index.html`

## 🔑 AI Configuration (Recommended)

For best results, configure an AI API key:

### Using Anthropic Claude (Recommended)

1. Get an API key at [console.anthropic.com](https://console.anthropic.com/)
2. Set the environment variable:
   ```bash
   export ANTHROPIC_API_KEY='your-api-key-here'
   ```

### Using OpenAI GPT

1. Get an API key at [platform.openai.com](https://platform.openai.com/api-keys)
2. Set the environment variables:
   ```bash
   export AI_PROVIDER='openai'
   export OPENAI_API_KEY='your-api-key-here'
   ```

### Using .env File (Alternative)

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API key:
   ```
   ANTHROPIC_API_KEY=your-api-key-here
   ```

3. Restart the server

**Note:** The tool will work with basic template generation if no API key is provided, but AI-powered generation produces significantly better results.

## 📖 How to Use

1. **Provide Your Example Cover Letter:**
   - Upload a file (PDF, DOCX, or TXT), OR
   - Paste your cover letter text directly

2. **Provide the New Job Description:**
   - Upload a file (PDF, DOCX, or TXT), OR
   - Paste the job description text directly

3. **Click "Generate Cover Letter"**
   - Wait a few seconds while the AI adapts your cover letter

4. **Review and Download:**
   - Review the generated cover letter
   - Download in your preferred format (TXT, DOCX, or PDF)
   - Edit as needed in your word processor

## 🛠️ Requirements

- **Python**: 3.8 or higher
- **pip**: Python package manager
- **Browser**: Any modern web browser (Chrome, Firefox, Safari, Edge)

## 📁 Project Structure

```
cover-letter-generator/
├── server.py              # Flask backend server
├── index.html            # Web interface
├── requirements.txt      # Python dependencies
├── start.sh             # Unix/Mac startup script
├── start.bat            # Windows startup script
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🔧 Technical Details

### Backend (server.py)
- **Framework**: Flask
- **Document Parsing**: PyPDF2, python-docx
- **Document Generation**: python-docx, ReportLab
- **AI Integration**: Anthropic Claude API, OpenAI API
- **Port**: 8080

### Frontend (index.html)
- Pure HTML/CSS/JavaScript
- No frameworks required
- Responsive design
- Drag-and-drop file upload

## 🐛 Troubleshooting

### "Module not found" errors
Install dependencies with:
```bash
pip install -r requirements.txt --break-system-packages
```

### Server won't start
- Check if port 8080 is already in use
- Try killing existing Python processes:
  ```bash
  pkill -f server.py
  ```

### Browser doesn't open automatically
- Manually open `index.html` in your browser
- Or use VS Code's Live Server extension

### "Failed to connect to server" error
- Make sure the server is running on port 8080
- Check the server terminal for error messages
- Try restarting the server

### Generated cover letters are generic
- Configure an AI API key (ANTHROPIC_API_KEY or OPENAI_API_KEY)
- Without AI, the tool uses basic templates
- With AI, results are significantly better and more personalized

## 💡 Tips

- **Keep the server running** while generating multiple cover letters
- **Provide detailed job descriptions** for better results
- **Use a well-written example** as your template
- **Review and edit** the generated cover letter before sending
- **Customize further** in your preferred word processor
- Downloads are saved to your browser's download folder

## 🔒 Privacy & Security

- **No cloud storage**: All processing happens locally
- **No data retention**: Cover letters are not saved by the tool
- **API calls**: If using AI, data is sent to Anthropic/OpenAI APIs
- **Local files only**: Uploads are processed in memory and discarded

## 📝 Example Workflow

1. **Start the tool:**
   ```bash
   ./start.sh
   ```

2. **Upload your best cover letter** from a previous application

3. **Paste the new job description** from the posting

4. **Click Generate** and wait ~5-10 seconds

5. **Review the result** - the AI adapts:
   - Your writing style and tone
   - Relevant skills and experiences
   - Company-specific customization
   - Industry-appropriate language

6. **Download as DOCX** and make final edits

7. **Submit with confidence!**

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use this tool for personal or commercial purposes.

## ⚠️ Disclaimer

This tool is designed to help adapt and improve your cover letters, but:
- Always review and edit the generated content
- Ensure accuracy of all information
- Customize for your specific situation
- The tool is an aid, not a replacement for your judgment

## 🆘 Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Ensure all requirements are installed
3. Check server logs for error messages
4. Verify your AI API key is valid (if using AI)

## 🎯 Roadmap

Potential future enhancements:
- [ ] Support for more file formats
- [ ] Multiple language support
- [ ] Resume parsing and integration
- [ ] Company research integration
- [ ] Tone/style customization options
- [ ] Browser extension
- [ ] Mobile app

---

**Made with ❤️ for job seekers everywhere**

Need help? Have questions? Feel free to open an issue!
