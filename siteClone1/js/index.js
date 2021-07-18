const $modal = document.querySelector(".modal");
const $modalBtn = document.querySelector(".menu_btn");
const $modalCloseBtn = document.querySelector(".menu_close");
const $modalDialog = document.querySelector(".modal_dialog");
$modalBtn.addEventListener('click', () => {
    $modal.classList.toggle("modal_block");
    $modalDialog.classList.toggle("modal_dialog_opacity");
});
$modalCloseBtn.addEventListener('click', () => {
    $modal.classList.toggle("modal_block");
    $modalDialog.classList.toggle("modal_dialog_opacity");
});
window.onload = () => {
    document.body.classList.add("body_fadeIn");
}
window.onkeydown = modalEscAction;

function modalEscAction(e) {
    const modalClassvalue = $modal.classList.value;
    if (e.keyCode == 27) {
        if (modalClassvalue.match(/modal_block/)) {
            $modal.classList.toggle("modal_block");
            $modalDialog.classList.toggle("modal_dialog_opacity");
        }
    }
}