/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */


class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element === undefined) {
      throw new Error('Ошибка')
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = document.querySelector('.create-account');
    createAccount.addEventListener('click', () => {
      const popup = App.getModal('createAccount');
      popup.open();
    });
    const actualAccount = this.element;
    actualAccount.addEventListener('click', (e) => {
      if (e.target) {
        const parentElement = e.target.closest('.account');
        if (parentElement != null) {
          this.onSelectAccount(parentElement);
        }
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const currentUser = User.current();
    if (currentUser !== undefined) {
      Account.list(currentUser, (err, response) => {
        if (response.success) {
          this.clear();
          const arrData = response.data;
          arrData.forEach((item) => this.renderItem(item));
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const arr = Array.from(document.querySelectorAll('.account'));
    arr.forEach(item => item.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const arrAcc = Array.from(document.querySelectorAll('.account'));
    arrAcc.forEach((item) => item.classList.remove('active'));
    if (element.classList.contains('active') === false) {
      const dataId = element.dataset.id;
      element.classList.add('active');
      App.showPage('transactions', { account_id: dataId });
    }
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    const accountWidged = document.querySelector('.accounts-panel');
    return accountWidged.insertAdjacentHTML('afterbegin',
      `<li class="active account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum}</span>
        </a>
    </li>`);
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    this.element = this.getAccountHTML(data);
  }
}
