# QA-Automation-Portfolio

This is my learnings and code experiments for Software testing. As any other person, my work is not perfect, but definitely improving everyday.

**Live site:** [souju96.github.io/QA-Automation-Portfolio](https://souju96.github.io/QA-Automation-Portfolio/)

Hands-on test automation projects by **Soujanya Akella**, QA Automation Engineer (5+ years: banking and media platforms). They run against public demo sites and public datasets, so no proprietary code or data is used.

| Project | Stack | What it shows |
|---|---|---|
| [`playwright-js/`](playwright-js) | Playwright, JavaScript | UI tests on saucedemo.com: Page Object Model, data-driven tests, cross-browser (Chromium + Firefox), HTML reports, tracing on retry |
| [`api-automation/`](api-automation) | Playwright `request`, Ajv, JavaScript | API tests on restful-booker: auth fixture, client class, chained create/read/update/delete lifecycle, JSON-schema validation, negative cases, data-driven checks |
| [`llm-testing/`](llm-testing/Testing-an-LLM.md) | Exploratory testing, test plan, report | Test plan, results and findings from testing a public AI chatbot: hallucination traps, instruction following, safety, prompt injection, consistency, UI checks, and how to turn them into a repeatable evaluation set |
| [`Machine-Learning-Python/Boston-Housing-Linear-Regression/`](Machine-Learning-Python/Boston-Housing-Linear-Regression) | Python, pandas, scikit-learn, seaborn | Boston housing price prediction: simple and multiple linear regression, outlier removal (z-score and IQR), feature scaling, random forest comparison, and EDA with correlation heatmap and VIF |
| [`Machine-Learning-Python/Bank-Churn-Decision-Tree/`](Machine-Learning-Python/Bank-Churn-Decision-Tree) | Python, pandas, scikit-learn, Graphviz | Bank customer churn classification: one-hot encoding, decision tree with Graphviz plots, random forest, confusion matrix and accuracy, with notes on overfitting and class imbalance |
| [`Machine-Learning-Python/Diabetes-Logistic-Regression/`](Machine-Learning-Python/Diabetes-Logistic-Regression) | Python, pandas, scikit-learn, seaborn | Diabetes prediction with logistic regression: confusion matrix, precision and recall, ROC curve and AUC, with notes on missing values and threshold choice |
| [`Machine-Learning-Python/KMeans-Customer-Segmentation/`](Machine-Learning-Python/KMeans-Customer-Segmentation) | Python, NumPy, pandas, scikit-learn | Customer segmentation with K-means clustering: a from-scratch implementation and scikit-learn, elbow method, and five customer segments, with notes on the from-scratch version's limitations |

CI: [GitHub Actions](.github/workflows/tests.yml) runs both suites on every push and weekly, and uploads the HTML reports as artifacts.

## Run locally
```bash
cd playwright-js      # or api-automation
npm install
npx playwright install   # UI project only
npx playwright test
npx playwright show-report
```

## Design choices
- **Page Object Model** keeps locators and actions out of the test bodies, so a UI change is fixed in one place.
- **Role- and label-based locators** and Playwright's auto-waiting, instead of fixed sleeps, for stable tests.
- **Fixtures** provide an authenticated API client to every test.
- **Schema validation** checks response structure, not only status codes.
- Public demo sites can change or be slow. A failure can be an environment issue, so check the trace or report first.

Open to SDET / QA Automation roles. See my [LinkedIn](https://www.linkedin.com/in/subramanya-soujanya/).
