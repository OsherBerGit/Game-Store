# 🎮 Game Store

![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?logo=sqlalchemy&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?logo=javascript&logoColor=black)

<!--
<div align="center">
  <img src="https://via.placeholder.com/800x400.png?text=Game+Store+Catalog+Preview" alt="Game Store Screenshot" width="90%"/>
</div>
-->

## 📖 About
**Game Store** is a fully functional e-commerce platform for digital video games. 

Unlike modern Single Page Applications (SPAs), this project demonstrates a robust **Server-Side Rendering (SSR)** architecture using **Jinja2**. It features a dynamic frontend built with **Vanilla JavaScript** to handle cart interactions and filtering without heavy framework overhead.

## 🛠 Tech Stack
* **Backend:** Python 3, Flask
* **Database & ORM:** SQLite / PostgreSQL, SQLAlchemy
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Templating:** Jinja2
* **Architecture:** MVC (Model-View-Controller) pattern

## ✨ Highlights & Features

### 🛒 User Experience
* **Dynamic Catalog:** Browse games with real-time search and genre filtering.
* **Smart Cart System:** Add/remove items with persistent session management (games stay in the cart even if you refresh).
* **User Accounts:** Secure registration, login, and profile management including order history.

### 🛡️ Admin & Management
* **Admin Dashboard:** A dedicated, secured area for site managers.
* **CRUD Operations:** Admins can add new games, update prices, and delete obsolete entries.
* **Sales Analytics:** View registered users and platform activity.

### ⚙️ Technical Depth
* **Manual DOM Manipulation:** Frontend logic is implemented using pure JavaScript to demonstrate core understanding of the DOM events.
* **Secure Auth:** Password hashing and session protection.

## 🚀 Quick Start
To run the store on your local machine:

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/OsherBerGit/game-store.git](https://github.com/OsherBerGit/game-store.git)
    cd flask-game-store
    ```
2.  **Create Virtual Environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    ```
3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Initialize Database:**
    ```bash
    flask db upgrade
    # OR python init_db.py (depending on your setup)
    ```
5.  **Run the Server:**
    ```bash
    flask run
    ```
    Visit `http://127.0.0.1:5000`

---
*Note: This project focuses on backend logic and raw frontend implementation.*
