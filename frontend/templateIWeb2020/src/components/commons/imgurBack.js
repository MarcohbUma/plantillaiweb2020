const uploadImage = (props) => {
    const image = document.getElementsByClassName("input-image")[0].files[0];
    //const url = `http://localhost:3030/uploadImage`;
    const url = 'https://templateparcial3mhb.herokuapp.com/uploadImage'
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData.get("image"));
    //console.log(image);

    const doFetch = async () => {
        console.log(formData);
        const response = await fetch(url, {
            method: "POST",
            body: formData,
            redirect: "follow",
        });
        const imageUrl = await response.json();

        try {
            //array
            props.templateEntity.images.push(imageUrl);
            props.setTemplateEntity({...props.templateEntity});
            console.log(props.templateEntity);
            //single photo
            //props.setTemplateEntity({ ...props.templateEntity, image: imageUrl });
        } catch (e) {
            console.log(e);
        }
    };

    doFetch();
};

export default uploadImage;
