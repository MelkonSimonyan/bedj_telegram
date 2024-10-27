<?php
// Перейти по адресу, чтобы добавить веб хук
// https://api.telegram.org/bot8173609359:AAFg8utJq3uTjOZIt1Sjk_RbTdrzqt_HZpc/setWebhook?url=https://bedj-tg.melkonsimonyan.com/bot.php

// Замените на ваш токен, полученный у BotFather
$token = '8173609359:AAFg8utJq3uTjOZIt1Sjk_RbTdrzqt_HZpc';

$messageText = 'Learn to DJ Step by Step️ ⚡️';
$messageBtn = 'Play';
$messageUrl = 'https://t.me/BeDjTest_bot/BeDj';

// Получаем данные, которые Telegram отправляет на вебхук
$input = file_get_contents('php://input');
$update = json_decode($input, true);

// Проверяем, есть ли сообщение
if (isset($update['message'])) {
  $chatId = $update['message']['chat']['id'];
  $message = $update['message']['text'];
  $first_name = $update['message']['from']['first_name'];
  $last_name = $update['message']['from']['last_name'];

  // Если пользователь отправил команду /start, отправляем приветствие с кнопками
  if ($message === '/start') {
    sendButtons($chatId);
  } else {
    // Отправляем обычный ответ
    //sendMessage($chatId, "$first_name $last_name: $message");
  }
}

// Функция для отправки сообщения
function sendMessage($chatId, $text)
{
  $data = array(
    'chat_id' => $chatId,
    'text' => $text
  );

  sendPostRequest($data);
}

// Функция для отправки сообщения с кнопками
function sendButtons($chatId)
{
  global $messageText;
  global $messageBtn;
  global $messageUrl;
  $keyboard = array(
    'inline_keyboard' => array(
      array(
        array(
          'text' => $messageBtn,
          'url' => $messageUrl
        )
      )
    )
  );

  $data = array(
    'chat_id' => $chatId,
    'text' => $messageText,
    'reply_markup' => json_encode($keyboard)
  );

  sendPostRequest($data);
}

// Функция для отправки POST-запроса
function sendPostRequest($data)
{
  global $token;
  $url = "https://api.telegram.org/bot$token/sendMessage";

  $options = array(
    'http' => array(
      'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
      'method'  => 'POST',
      'content' => http_build_query($data),
    ),
  );

  $context  = stream_context_create($options);
  $result = file_get_contents($url, false, $context);

  if ($result === FALSE) {
    // Обработка ошибки
    error_log("Ошибка при отправке запроса: " . print_r($data, true));
  }
}
