const clientId = "7f8e9bae4498539"
const uploadImage = (props) => {
    const r = new XMLHttpRequest();
    const d = new FormData();
    const e = document.getElementsByClassName("input-image")[0].files[0];
    let u;

    d.append("image", e);
    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader("Authorization", "Client-ID 7f8e9bae4498539");
    r.onreadystatechange = function () {
        if (r.status === 200 && r.readyState === 4) {
            let res = JSON.parse(r.responseText);
            u = `https://i.imgur.com/${res.data.id}.png`;
            //props.setProduct({ ...props.product, image: u });
            props.templateEntity.images.push(u);
            props.setTemplateEntity({...props.templateEntity});
            console.log(props.templateEntity);
        }
    };
    r.send(d);
};

export default uploadImage;
