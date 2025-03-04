const HASHTAG_QUANTITY = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const Errors = {
  hashtagQuantity: 'Превышено количество хэштегов',
  hashtagName:'Введён невалидный хэштег',
  hashtagDuplicate:'Хэштеги повторяются',
  commentLength: 'Длина комментария больше 140 символов'
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
  return hashtags.length <= HASHTAG_QUANTITY;
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

pristine.addValidator(hashtagField, validateHashtagsQuantity, Errors.hashtagQuantity);
pristine.addValidator(hashtagField, validateHashtagName, Errors.hashtagName);
pristine.addValidator(hashtagField, validateHashtagDuplicate, Errors.hashtagDuplicate);
pristine.addValidator(descriptionField, validateDescription, Errors.commentLength);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
