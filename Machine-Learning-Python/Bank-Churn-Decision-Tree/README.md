# Bank customer churn: decision tree and random forest (Python)

A personal machine learning project that predicts whether a bank customer will leave (`Exited` = 1) from their profile, using a decision tree and a random forest classifier.

## Files
| File | What it is |
|---|---|
| `Bank_churning_classification.ipynb` | The notebook: explanation, code, saved outputs and decision tree plots |
| `Bank_Customers.csv` | The dataset: 10,000 customers, 13 columns plus the target `Exited` |

## Data
Each row is a customer: credit score, country (`Geography`), `Gender`, `Age`, `Tenure`, `Balance`, `NumOfProducts`, `HasCrCard`, `IsActiveMember`, `EstimatedSalary`, and whether they left. This appears to be the widely shared public "Churn Modelling" dataset (synthetic customer records, available on Kaggle). About 20% of customers in it left.

## What the notebook does
1. **Prepares the data:** drops the identifier columns (`CustomerId`, `Surname`), converts `HasCrCard` and `IsActiveMember` to booleans, and one-hot encodes `Geography` and `Gender`.
2. **Splits** the data 80/20 into training and test sets.
3. **Decision tree** (entropy / information gain): trains it, draws the tree with Graphviz, and checks a confusion matrix and accuracy on test and training data.
4. **Random forest classifier:** trains it, checks accuracy, and draws several of its trees.

## Results saved in the notebook
| Model | Test accuracy | Training accuracy |
|---|---|---|
| Decision tree (entropy, unpruned) | 0.79 | 1.00 |
| Random forest (default settings) | 0.873 | not shown |

Decision tree confusion matrix on the 2,000 test customers (rows are actual stay and leave, columns are predicted stay and leave): 1408 and 215, then 205 and 172.

## Run it
```bash
pip install pandas scikit-learn matplotlib seaborn scipy graphviz pydotplus six jupyter
jupyter notebook Bank_churning_classification.ipynb
```
Keep `Bank_Customers.csv` in the same folder as the notebook; it is read with a relative path. To draw the trees you also need the Graphviz program installed (not only the Python package). Python 3.12 was used.

## Notes and what I would improve
- **Overfitting:** the unpruned decision tree scores 100% on training data and 79% on test data. Limiting `max_depth` or `min_samples_leaf`, or using cross-validation, would address this.
- **Accuracy alone is misleading here:** only about 20% of customers leave, so always predicting "stays" scores about 81% on the test set. The decision tree's 79% is no better than that baseline. Precision, recall, F1 and ROC AUC (the confusion matrix gives a recall for churners of about 46%) say more about how well it finds the customers who leave.
- **The two models are not strictly comparable:** they use different random train/test splits (seeds 20 and 40). A fair comparison uses the same split or cross-validation.
- **Not done:** hyperparameter tuning is imported (`RandomizedSearchCV`) but not run, and the notebook does not report feature importances.
- Cell 31 sets a Graphviz path for my own Windows machine; change or remove it on yours.
- The dataset includes `Geography` and `Gender`. In a real retention or lending setting, features like these need a fairness review before they are used in a model.
