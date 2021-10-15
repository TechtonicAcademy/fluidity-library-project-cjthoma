const handleAddImage = (file, setBookData) => {
  const fr = new FileReader();
  fr.onload = (e) => {
    const img = e.target.result;
    setBookData((prevState) => ({ ...prevState, image: file, tmpImage: img }));
  };

  fr.readAsDataURL(file);
};

export default handleAddImage;