const utils = {
  requestData: async (url, callback) => {
    try{
      const response = await fetch(url);
  
      if(!response.ok){
        throw new Error('Request failed!');
      }
  
      const data = await response.json();
  
      callback(data);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getFullname: (name) => {
    return `${name.first} ${name.last}`;
  }
};