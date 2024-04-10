# budget-tracker

major:
CRUD Сервис товаров:
Хранит информацию о товарах, включая название, описание, цену, изображения и т.д. 
Поддерживает категории товаров, теги, поиск товаров.
Обеспечивает доступ к информации о товарах для других сервисов.

CRUD Сервис списков покупок:
Дает возможность создавать и управлять списками покупок.
Добавлять товары в списки, указывать количество и статус (куплено/не куплено).
Распределять расходы между участниками списка.
Обеспечивает доступ к спискам покупок для других сервисов.

CRUD Сервис расчетов:
Распределяет расходы между участниками списка покупок.
Поддерживает различные методы деления расходов (поровну, пропорционально, по фиксированным суммам).
Отслеживает платежи участников.
Дает доступ к информации о расходах для других сервисов.

CRUD Сервис Юзера auth-optional

Gateway API 
Kafka 

optional: 
CRUD Сервис уведомлений:
Отправляет уведомления пользователям о событиях в системе (добавление в список, изменения, платежи).

CRUD Сервис истории:
Хранит историю действий пользователей (добавление товаров, изменение списков, платежи).





