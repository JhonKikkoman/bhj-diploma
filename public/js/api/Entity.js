
/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static url = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback) {
    const currentAccount = this.url + '/' + data.id;
    const currrentTransaction = this.url + '?account_id=' + data;
    if (this.url === '/account') {
      createRequest({
        url: currentAccount,
        method: 'GET',
        data,
        callback: callback
      });
    } else {
      createRequest({
        url: currrentTransaction,
        method: 'GET',
        data,
        callback: callback
      });
    }
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: this.url,
      method: 'PUT',
      data: data,
      callback: callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback) {
    createRequest({
      url: this.url,
      method: 'DELETE',
      data: data,
      callback: callback
    });
  }
}
