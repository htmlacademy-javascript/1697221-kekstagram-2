const uploadForm = document.querySelector('.img-upload__form');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const HASHTAG_QUANTITY = 5;
const COMMENT_MAX_LENGTH = 140;

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const getHashtags = (value) => value.trim() ? value.toLowerCase().trim().split(/\s+/) : [];

const validateHashtagsQuantity = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= HASHTAG_QUANTITY;
};

const validateHashtagName = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length === 0 || hashtags.every((hashtag) => hashtagRegExp.test(hashtag));
};

const validateUniqueHashtagName = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length === 0 || new Set(hashtags).size === hashtags.length;
};

const validateDescription = (value) => value.trim().length <= COMMENT_MAX_LENGTH;

pristine.addValidator(hashtagField, validateHashtagsQuantity, 'Превышено количество хэштегов');
pristine.addValidator(hashtagField, validateHashtagName, 'Введён невалидный хэштег');
pristine.addValidator(hashtagField, validateUniqueHashtagName, 'Хэштеги повторяются');
pristine.addValidator(descriptionField, validateDescription, 'Длина комментария больше 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
