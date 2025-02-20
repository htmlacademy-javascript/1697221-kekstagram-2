import {getRandomNumber, getId} from './util';

// Вводные

const QUANTITY = 25; // количество объектов и максимальное число, которое используется при генерации идентификаторов в id и строки url
const AVATAR_QUANTITY = 6; // максимальное число, которое используется для генерации строки avatar
const MIN_LIKES = 15; // минимальное количество лайков, поставленных фотографии
const MAX_LIKES = 200; // максимальное количество лайков, поставленных фотографии
const MAX_COMMENTS_QUANTITY = 30; // максимальное количество комментариев, оставленных к фотографии

const DESCRIPTION = [ // массив описаний фотографий, из него формируется строка description
  'Вот такая пятница!',
  'Отпууууск',
  'Доброе утро - это когда так...',
  'Как вы проводите праздники?',
  'Живу свою прекрасную жизнь',
  'Как делишки?',
  'Учу JS, чтобы в моей жизни было это'
];

const MESSAGES = [ // массив сообщений, из него формируется текст комментария message
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [ // массив имен, из него формируется строка name
  'Ангелина',
  'Антон',
  'Борис',
  'Валерия',
  'Кирилл',
  'Ольга',
  'Станислав',
  'Ульяна',
  'Яков'
];

// Решение

const getCommentId = getId();
const getPhotoId = getId();


const generateComment = () => ({ // функция, создающая объект "комментарий"
  id:  getCommentId(),
  avatar: `img/avatar-${ getRandomNumber(1, AVATAR_QUANTITY) }.svg`,
  message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
  name: NAMES[getRandomNumber(0, NAMES.length - 1)],
});

const collectComments = () => { // функция, собирающая комментарии в один массив
  const comments = [];
  const commentsQuantity = getRandomNumber (0, MAX_COMMENTS_QUANTITY);
  for (let i = 0; i < commentsQuantity; i++) {
    comments.push(generateComment());
  }
  return comments;
};

const createPhotoDescription = () => {// функция, создающая объект "описание фотографии"
  const photoId = getPhotoId ();
  return {
    id: photoId,
    url: `photos/${ photoId }.jpg`,
    description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: collectComments() ,
  };
};
const createPhotoArray = () => { // функция, собирающая описания фотографий в один массив
  const photoArray = [];

  for (let i = 1; i <= QUANTITY; i++) {
    photoArray.push(createPhotoDescription());
  }
  return photoArray;
};

// const dataArray = createPhotoArray();

export {createPhotoArray};
