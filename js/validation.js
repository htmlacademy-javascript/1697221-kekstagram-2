const MAX_HASHTAG_QUANTITY = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const Errors = {
  HASHTAG_QUANTITY: 'Превышено количество хэштегов',
  HASHTAG_NAME:'Введён невалидный хэштег',
  HASHTAG_DUPLICATE:'Хэштеги повторяются',
  COMMENT_LENGTH: 'Длина комментария больше 140 символов'
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const getHashtags = (value) => value.trim() ? value.toLowerCase().trim().split(/\s+/) : [];

const validateHashtagsQuantity = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAG_QUANTITY;
};

const validateHashtagName = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length === 0 || hashtags.every((hashtag) => HASHTAG_REGEXP.test(hashtag));
};

const validateHashtagDuplicate = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length === 0 || new Set(hashtags).size === hashtags.length;
};

const validateDescription = (value) => value.trim().length <= COMMENT_MAX_LENGTH;

pristine.addValidator(hashtagField, validateHashtagsQuantity, Errors.HASHTAG_QUANTITY);
pristine.addValidator(hashtagField, validateHashtagName, Errors.HASHTAG_NAME);
pristine.addValidator(hashtagField, validateHashtagDuplicate, Errors.HASHTAG_DUPLICATE);
pristine.addValidator(descriptionField, validateDescription, Errors.COMMENT_LENGTH);

export {pristine};
