function $(x) {
  return document.querySelector(x);
}

function initText() {
  let foo = '';
  for (let i=0; i<1000; i++) {
    foo += `line ${i} \n`;
  }
  $('.ed-text').innerText = foo;
}

function getContentRange(element) {
  const range = getSelection().getRangeAt(0);
  const preCaretRange = new Range();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange;
}

function getCaret(element) {
  let ret = {}
  const sel = getSelection()
  if (!(sel.rangeCount)) return undefined;
  const range = getSelection().getRangeAt(0);
  const ebox = element.getBoundingClientRect();
  const rbox = range.getBoundingClientRect();
  const xoff = ebox.x + parseFloat(getComputedStyle(element).paddingLeft);
  const yoff = ebox.y + parseFloat(getComputedStyle(element).paddingTop) - element.scrollTop;
  const crange = getContentRange(element);
  ret.idx = crange.toString().length;
  ret.x = rbox.x - xoff;
  ret.y = rbox.y - yoff;
  ret.col = range.endOffset;
  ret.row = 0;
  return ret;
}
