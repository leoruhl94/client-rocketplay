const initialState: ArticleState = {
    // Que nos van a traer
    /*
    
    categories : [{},{}] -.
    */ 
    articles: [
        {
            id: 1,
            title: "prop1",
            body: 'val1'
        }
    ]
  }

  // ..... ..... ..... .....
const reducer = (
    state: ArticleState = initialState,
    action: ArticleAction
  ): ArticleState => {
    switch (action.type) {
      
    }
    return state
  }
  
  // ..... ..... ..... .....
  export default reducer