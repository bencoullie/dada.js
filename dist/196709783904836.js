window.poopComponents = {
  app: {
    script:
      "console.log('This');  console.log('Is');  console.log('Poopy.js');",
    html: '<div>    <h1>It is pointless</h1>    <ButtonPoop text="haha yes."></ButtonPoop>  </div>',
    style: "h1 {    color: 'tomato';  }",
  },
  button: {
    script:
      "window.clickPoop = () => {    confirm('Is this the next React?');  };",
    html: '<button onclick="window.clickPoop">{ PoopProps.text }</button>',
    style:
      "button {    background-color: 'tomato';    color: white;    border: 1px solid #eee;    border-radius: 5px;    padding: 10px;  }",
  },
}
