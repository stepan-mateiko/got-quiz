# Game of Thrones Quiz

A web-based quiz game that tests your knowledge of the Game of Thrones universe. Players answer multiple-choice questions with a time limit, and results are displayed at the end of the quiz.

Live site: https://got-quiz-xi.vercel.app/

---

## Features

- Multiple-choice quiz (12 questions per session)
- Randomized questions from a larger pool
- Timer (15 seconds per question)
- Immediate feedback for correct and incorrect answers
- Results screen with themed messages and images
- Responsive design for desktop and mobile
- Accessibility: ARIA attributes, keyboard navigation, focus management
- Language switcher: English and Ukrainian

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts: Noto Sans, Noto Serif
- Font Awesome: check/cross icons

---

## Project Structure

```
got-quiz/
├─ index.html
├─ styles.css
├─ robots.txt
├─ sitemap.xml
├─ js/
│  ├─ i18n.json
│  ├─ quiz-logic.js
│  └─ script.js
├─ tests/
│  └─ quiz-logic.test.js
├─ img/
│  ├─ 002.jpg
│  ├─ 1048346-game-of-thrones.jpg
│  ├─ crown.jpg
│  ├─ lannister.jpg
│  ├─ crow.jpg
│  └─ watch.jpg
└─ README.md
```

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/got-quiz.git
```

2. Open `index.html` in your browser.

---

## Usage

1. Click Start to begin the quiz.
2. Read the rules and click Continue.
3. Answer each question within the time limit.
4. Click Next Question to proceed.
5. View your score and restart or exit.

---

## Language Support

Translations and questions live in `js/i18n.json`. The app loads the selected language from local storage or defaults to the browser language.

---

## Tests

Run unit-style tests for quiz logic:

```bash
npm test
```

---

## Customization

- Questions and translations: `js/i18n.json`
- Number of questions per session: update the count in `js/script.js`
- Timer duration: update `timeValue` in `js/script.js`
- Styling and theme: `styles.css`

---

## License

This project is open-source and available under the MIT License.

---

## Credits

- Game of Thrones content © George R.R. Martin
- Fonts: Google Fonts
- Icons: Font Awesome
