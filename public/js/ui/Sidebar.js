
/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggle = document.querySelector('.sidebar-toggle');
    const bodySideBar = document.querySelector('.sidebar-mini');
    toggle.addEventListener('click', () => bodySideBar.classList.toggle('sidebar-open'),
      bodySideBar.classList.toggle('sidebar-collapse'));
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerOpen = document.querySelector('.menu-item_register');
    registerOpen.addEventListener('click', () => {
      const register = App.getModal('register');
      register.open();
    });
    const loginOpen = document.querySelector('.menu-item_login');
    loginOpen.addEventListener('click', () => {
      const register = App.getModal('login');
      register.open();
    });
    const logoutItem = document.querySelector('.menu-item_logout');
    logoutItem.addEventListener('click', () => {
      User.logout((err, response) => {
        if (response.success) {
          App.setState('init');
        }
      })
    })

  }
}