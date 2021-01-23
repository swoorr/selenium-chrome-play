module.exports = {
    saveimg: async function(stringContent){
        var base64Data = stringContent.replace(/^data:image\/png;base64,/, "");

        require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
            console.log(err);
        });
    }
}