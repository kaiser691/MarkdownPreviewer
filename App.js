

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.textChange = this.textChange.bind(this);
  }
  renderHeader(){
    return(
      <header>
          <div className="flex-row default-cursor">
            <span className="material-symbols-outlined">
edit_document
</span>
            <h1>EDITOR</h1>
          </div>
           {this.expandCollapseIcon()}
        </header>
    );
  }

  expandCollapseIcon(){
    if(this.props.expand){
      return(
        <span className="material-symbols-outlined expand" onClick={this.props.editorExpandToggle}>
collapse_content
</span>
      );
    }else{
      return(
        <span className="material-symbols-outlined expand" onClick={this.props.editorExpandToggle}>
expand_content
</span>
      );
    }
  }
  
  textChange(){
    const textEditor = document.getElementById("editor");
    const value = textEditor.value;
    this.props.textChange(value);
  }
  
  
  
  render(){
    const placeholder = `Write a markup text here...
    
      Samples: 
      # Heading level 1	      <h1>Heading level 1</h1>
      ### Heading level 3	    <h3>Heading level 3</h3>
      ###### Heading level 6	<h6>Heading level 6</h6>
      Alternate Syntax:
      Heading level 1         <h1>Heading level 1</h1>
      ===============	   
      
      Tips:
      To create a line break or new line (<br>), end a line with two or more spaces, and then type return.
      
      Bold: 
      I just love **bold text**.	I just love <strong>bold text</strong>.	I just love bold text.
      I just love __bold text__.	I just love <strong>bold text</strong>.	I just love bold text.
      Love**is**bold	            Love<strong>is</strong>bold	Loveisbold
      
      Italic: 
      To italicize text, add one asterisk or underscore before and after a word or phrase. To italicize the             middle of a word for emphasis, add one asterisk without spaces around the letters.
      
      BlockQuote:
      To create a blockquote, add a > in front of a paragraph.
      
      Blockquotes with Multiple Paragraphs:
        Blockquotes can contain multiple paragraphs. Add a > on the blank lines between the paragraphs.
        Sample:
        > Dorothy followed her through many of the beautiful rooms in her castle.
        >
        > The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
      
      Nested Blockquotes:
          Blockquotes can be nested. Add a >> in front of the paragraph you want to nest.
          Sample:
          > Dorothy followed her through many of the beautiful rooms in her castle.
          >
          >> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

      Ordered Lists:
          To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to             be in numerical order, but the list should start with the number one.
          
      Unordered Lists:
          To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items.             Indent one or more items to create a nested list.
       
      Code:
          To denote a word or phrase as code, enclose it in backticks (\`).
      
      Multi-line Code:
          surrond the text with three back-ticks (\`\`\`) to create multi line code
       
      Links:
          To create a link, enclose the link text in brackets (e.g., [Duck Duck Go]) and then follow it                     immediately with the URL in parentheses (e.g., (https://duckduckgo.com)).
          Sample:
          My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

      Visit: https://www.markdownguide.org/basic-syntax/
        for more info on markdown syntax.
    `;
    return (
    <div id="editor-container" className={this.props.expand ? "editor-expand" : "editor-collapse"}>
        {this.renderHeader()}
        <textarea id="editor" placeholder={placeholder} onChange={this.textChange} value={this.props.text}></textarea>
    </div>
    );
  }
  
  
}
class Preview extends React.Component{
  constructor(props){
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
  }
  
  
  renderHeader(){
    return(
      <header>
          <div className="flex-row default-cursor">
            <span className="material-symbols-outlined">
preview
</span>
            <h1>PREVIEW</h1>
          </div>
          {this.expandCollapseIcon()}
        </header>
    );
  }
  
  expandCollapseIcon(){
    if(this.props.expand){
      return(
        <span className="material-symbols-outlined expand" onClick={this.props.previewExpandToggle}>
collapse_content
</span>
      );
    }else{
      return(
        <span className="material-symbols-outlined expand" onClick={this.props.previewExpandToggle}>
expand_content
</span>
      );
    }
  }
  
  createMarkup(){
    return {__html: marked(this.props.text)};
  }
  
  render(){
    return (
    <div id="preview" className={this.props.expand ? "preview-expand" : "preview-collapse"}>
        {this.renderHeader()}
      <div id="output-container">
      <div id="output" dangerouslySetInnerHTML={this.createMarkup()}/>
          {marked(this.props.text)}
      </div>
    </div>
    );
  }
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: "",
      editorExpand: false,
      previewExpand: false
    };
    this.editorExpandToggle = this.editorExpandToggle.bind(this);
    this.previewExpandToggle = this.previewExpandToggle.bind(this);
    this.textChange = this.textChange.bind(this);
  }
  textChange(newText){
    this.setState({text: newText});
  }
  previewExpandToggle(){
    this.setState({
      previewExpand: !this.state.previewExpand
    });
  }
  editorExpandToggle(){
    this.setState(prevState =>({
      editorExpand: !prevState.editorExpand
    }));
  }
  render(){
    const editComp = this.state.editorExpand ? <Editor text={this.state.text} textChange={this.textChange} expand={this.state.editorExpand} editorExpandToggle={this.editorExpandToggle}/> : null;
    const prevComp = this.state.previewExpand ? <Preview text={this.state.text} expand={this.state.previewExpand} previewExpandToggle={this.previewExpandToggle}/> : null;
    const editPrevComp = !this.state.previewExpand && !this.state.editorExpand ? <><Editor text={this.state.text} textChange={this.textChange} expand={this.state.editorExpand} editorExpandToggle={this.editorExpandToggle}/> <Preview text={this.state.text} expand={this.state.previewExpand} previewExpandToggle={this.previewExpandToggle}/></> : null;
    
    return(
      <>
        <div id="my-header">
          <h1>Markdown Previewer by Kaiser Acosta</h1>
        </div>
        <div id="container">
          {editComp}
          {prevComp}
          {editPrevComp}
        </div>
      </>
    );
  }
}
const rootDiv = document.createElement("div");
rootDiv.id = "root";
document.body.appendChild(rootDiv);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);