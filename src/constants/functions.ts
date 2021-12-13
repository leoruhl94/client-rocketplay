import axios from "axios";

export async function getGoogleData(token:String) {
    const data = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
      );
    return data.data
}

export const getDates = () => {
  const fecha = new Date()
  const day = fecha.getDate()
  let monthly : number = 0

  if(day < 10){
      let month = fecha.getMonth() + 1
      monthly = month
  }else{
      if(fecha.getMonth() < 10){
          let monthTwo = fecha.getMonth() + 2 
          monthly = monthTwo
      }else{
          let month = 1
          monthly = month
      }
  }

  const year = fecha.getFullYear()

  return {
      year : year,
      month : monthly,
      day : day
  }
}


export function testFunction(){
    // Ya se muestra la palabra jajaja
    let x = document.querySelectorAll("#snackbar");
    x.forEach((i) => {
      i.className = "show";
    });
    setTimeout(function(){ x[0].className = x[0].className.replace("show", ""); }, 3000);
}

export function pageTransition (dir){
    let pageTransition:any = {}
    
    if(dir==='left'){
        pageTransition = {
            in: {
                x: 0,
                position: 'fixed',
                width: '100%'
            },
            out: {
                x: '-100%',
                position: 'fixed',
                width: '100%'
            }
        }
    }else if(dir==='right'){
        pageTransition = {
            in: {
                x: 0,
                position: 'fixed',
                width: '100%'
            },
            out: {
                x: '100%',
                position: 'fixed',
                width: '100%'
            }
        }
    }else{
        pageTransition = {
            in: {
                x: 0,
                position: 'fixed',
                width: '100%'
            },
            out: {
                x: 0,
                position: 'fixed',
                width: '100%'
            }
        }
    }
    return pageTransition
}


export const ComponentDesc = () => {
    
}