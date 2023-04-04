
export const randomString =(length)=>{
    var text =''
    const  possible ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for(const i=0; i< length; i++)
    {
      text+= possible.charAt(Math.floor(Math.random()*possible.length))
    }
    return text

  }
