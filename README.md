# Game of Thrones Quiz

A web-based quiz game that tests your knowledge of the *Game of Thrones* universe. Players answer multiple-choice questions with a time limit, and results are displayed at the end of the quiz.

---

## Features

- **Multiple-choice quiz:** Answer 12 questions per session.
- **Randomized questions:** Each quiz session shows 12 random questions from a larger question pool.
- **Timer:** Each question has a countdown timer (15 seconds).
- **Interactive feedback:** Correct/incorrect answers are highlighted immediately.
- **Results screen:** Displays your score with themed messages and images.
- **Responsive design:** Works on desktop and mobile devices.
- **Accessible:** Includes ARIA attributes and keyboard navigation.

---

## Demo

<img width="1203" height="759" alt="image" src="https://github.com/user-attachments/assets/cb6f8e0f-28e1-497c-ad09-bf2c5385b2ff" />


---

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Google Fonts:** Berkshire Swash, Fondamento, Rubik, Aclonica
- **Font Awesome:** For check/cross icons

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/got-quiz.git
````

2. Open `index.html` in your browser.

---

## Project Structure

```
got-quiz/
├─ index.html
├─ styles.css
├─ js/
│  ├─ questions.js
│  └─ script.js
├─ img/
│  ├─ 002.jpg
│  ├─ crown.jpg
│  ├─ lannister.jpg
│  └─ crow.jpg
└─ README.md
```

---

## Usage

1. Click **"Start Quiz"** to begin.
2. Read the rules in the info box and click **Continue**.
3. Answer the multiple-choice questions within the time limit.
4. Click **Next Question** to proceed.
5. View your score at the end and either **restart** or **quit** the quiz.

---

## Accessibility Features

* ARIA attributes for live regions and dialog roles.
* Keyboard navigation (Tab + Enter/Space) supported for options.
* Screenreader-friendly structure.

---

## Customization

* **Questions:** Add, remove, or edit questions in `js/questions.js`.
* **Number of questions per quiz:** Change the number in `script.js` where random questions are selected.
* **Timer duration:** Adjust `timeValue` in `script.js`.
* **Styling:** Modify `styles.css` to change theme, fonts, or layout.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Credits

* Game of Thrones content © George R.R. Martin
* Fonts: [Google Fonts](https://fonts.google.com/)
* Icons: [Font Awesome](https://fontawesome.com/)

```

---

If you want, I can also **add a small “how to generate 12 random questions” section in the README** so it’s fully documented for future developers.  

Do you want me to do that?
```
