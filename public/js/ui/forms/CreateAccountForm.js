/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response.success) {
        const widgetAccount = App.getModal('createAccount');
        widgetAccount.close();
        App.update();
        const widgedForm = this.element;
        widgedForm.reset();
      }
    });
  }
}