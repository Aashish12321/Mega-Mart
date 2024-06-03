
const imageTobase64 = async (image) => {
  const reader = new FileReader();
  await reader.readAsDataURL(image);
  // console.log(image);
  
  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)

    reader.onerror = error => reject(error)
  })
  
  return data;
};

export default imageTobase64;
