// 1. Get DOM elements
const editor = document.getElementById('editor'); // Selects the textarea by ID
const preview = document.getElementById('preview'); // Selects the preview div by ID

// 2. Simple Markdown parser function
function parseMarkdown(text) { // Defines a function to convert Markdown to HTML
  let html = text; // Starts with the raw input text
  
  // Convert headers (e.g., # Header -> <h1>Header</h1>)
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>'); // Replaces # followed by text with h1 tags
  
  // Convert bold (e.g., **bold** -> <strong>bold</strong>)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); // Replaces **text** with strong tags
  
  // Convert italic (e.g., *italic* -> <em>italic</em>)
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>'); // Replaces *text* with em tags
  
  // Convert paragraphs (split by double newlines)
  html = html.split('\n\n').map(paragraph => { // Splits text into paragraphs
    if (!paragraph.match(/^<h1>/)) { // Checks if the paragraph isn’t already a header
      return `<p>${paragraph}</p>`; // Wraps non-header text in p tags
    }
    return paragraph; // Returns headers unchanged
  }).join(''); // Joins paragraphs back together
  
  // Convert single newlines within paragraphs to <br>
  html = html.replace(/\n/g, '<br>'); // Replaces single newlines with line breaks
  
  return html; // Returns the converted HTML
}

// 3. Function to update the preview
function updatePreview() { // Defines a function to refresh the preview
  const markdownText = editor.value; // Gets the current text from the textarea
  const htmlContent = parseMarkdown(markdownText); // Converts Markdown to HTML
  preview.innerHTML = htmlContent; // Sets the preview’s innerHTML to the converted content
}

// 4. Event listener for real-time updates
editor.addEventListener('input', updatePreview); // Listens for changes in the textarea and updates preview

// 5. Initial setup with sample Markdown
editor.value = `# Welcome\n\nType some **bold** or *italic* text here!`; // Sets initial text in the editor
updatePreview(); // Renders the initial text in the preview