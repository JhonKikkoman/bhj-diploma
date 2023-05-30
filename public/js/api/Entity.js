
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
    console.log(this.url)
    console.log(data)
    console.log(data.id)
    let newUrl = this.url;
    if (this.url === '/account') {
      newUrl += '/' + data.id;
    }
    if (this.url === '/transaction') {
      newUrl += '?account_id=' + data;
    }
    console.log(newUrl)
    // createRequest({
    //   url: newUrl,
    //   method: 'GET',
    //   callback: callback
    // });
    createRequest({
      url: this.url,
      method: 'GET',
      callback: callback
    });

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
