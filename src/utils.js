export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const assetPath = () => {
    if (__DEV__) {
        return '';
    } else {
        return 'pilgrim2/';
    }
}