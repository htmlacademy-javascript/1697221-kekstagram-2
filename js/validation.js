const uploadForm = document.querySelector('.img-upload__form');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const HASHTAG_QUANTITY = 5;

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  // errorClass: 'img-upload__field-wrapper--invalid',
  // successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const Errors = {
  quantity: 'Не больше 5 хэштегов',
  name: 'Введён невалидный хэштег'
};

let error = '';

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const checkHashtagsQuantity = (array) => array.length <= HASHTAG_QUANTITY;
const checkHashtagsName = (array) => array.every((element) => hashtag.test(element));


const validateHashtags = (value) => {
  const hashtags = value.trim().split(' ');
  if (!checkHashtagsQuantity(hashtags)) {
    error = Errors.quantity;
    return false;
  } else if (!checkHashtagsName(hashtags)) {
    error = Errors.name;
    return false;
  }

  return true;
};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  error); // не выводится нужное сообщение

const validateDescription = (value) => value.trim().length <= 140;

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Не больше 140 символов'); //сообщение об ошибке можно придумать самой?

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
