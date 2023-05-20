/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    if (currentUser !== undefined) {
      Account.list(currentUser, (err, response) => {
        if (response.success) {
          const select = this.element.querySelector('.accounts-select');
          const arrResponse = response.data;
          arrResponse.forEach((item) => select.insertAdjacentHTML('afterbegin',
            `<option value="${item.id}">${item.name}</option>`))
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        const transactionForm = this.element;
        transactionForm.reset();
        const parentElem = this.element.closest('.modal');
        const exitModal = App.getModal(`${parentElem.dataset.modalId}`);
        exitModal.close();
      }
    })
  }
}