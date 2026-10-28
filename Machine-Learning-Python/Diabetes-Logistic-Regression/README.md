# Diabetes prediction: logistic regression, confusion matrix and ROC/AUC (Python)

A personal machine learning project that predicts whether a patient has diabetes from seven medical measurements, using logistic regression. It evaluates the model with a confusion matrix, accuracy, precision, recall and the ROC curve with AUC, then tests whether cleaning the data and choosing a different decision threshold help.

## Files
| File | What it is |
|---|---|
| `Diabetes_Logistic_Regression_ROC_AUC.ipynb` | The notebook: explanation, code and saved outputs |
| `DiabetesDataset/pima-indians-diabetes-new.csv` | The data the notebook reads (768 rows, no header row) |
| `DiabetesDataset/diabetes.csv` | The same 768 rows with column names |
| `DiabetesDataset/diabetes_Metadata.xlsx` | The same 768 rows as an Excel sheet (despite the name, it holds the data, not a description of the columns) |

## Data
The Pima Indians Diabetes dataset, a well-known public dataset (National Institute of Diabetes and Digestive and Kidney Diseases, widely shared through UCI and Kaggle): 768 women of Pima Indian heritage, aged 21 or older. Each row has `Pregnancies`, `Glucose`, `BloodPressure`, `SkinThickness`, `Insulin`, `BMI`, `DiabetesPedigreeFunction`, `Age` and the outcome (1 = diabetes, 0 = no diabetes). The notebook uses seven of the eight measurements (it leaves out `SkinThickness`). About 35% of rows are positive. Results from this one population should not be generalised to other groups.

## What the notebook does
**Part 1: baseline model**
1. Loads the data and names the columns.
2. Splits it 75/25 into training and test sets (`random_state=0`).
3. Trains a `LogisticRegression` model with default settings.
4. Evaluates it with a confusion matrix (also as a heatmap), accuracy, precision, recall and a classification report.
5. Plots the **ROC curve** from the predicted probabilities and calculates the **AUC**.
6. Compares training accuracy with test accuracy to check for overfitting.

**Part 2: improving the model**
1. Counts the zeros that cannot be real measurements.
2. Compares the model with a "always answer no" baseline.
3. Builds a pipeline (median imputation of the impossible zeros, feature scaling, logistic regression with more iterations) and compares it with the baseline on the same split.
4. Plots both ROC curves, and shows how the decision threshold trades missed cases against false alarms.
5. Uses 5-fold stratified cross-validation to see whether the results hold beyond one split.

## Results
Test set of 192 patients, same split for both models:

| Model | Accuracy | Precision | Recall | F1 | AUC |
|---|---|---|---|---|---|
| Baseline (original: raw data, default settings) | 0.807 | 0.745 | 0.613 | 0.673 | 0.862 |
| Improved (impute zeros, scale, more iterations) | 0.792 | 0.729 | 0.565 | 0.636 | 0.859 |

5-fold cross-validation (mean +/- standard deviation):

| Model | Accuracy | Recall | AUC |
|---|---|---|---|
| Baseline | 0.776 +/- 0.024 | 0.582 +/- 0.046 | 0.834 +/- 0.028 |
| Improved | 0.771 +/- 0.031 | 0.571 +/- 0.045 | 0.837 +/- 0.030 |

Effect of the decision threshold (improved model, 62 patients in the test set have diabetes):

| Threshold | Precision | Recall | Missed cases | False alarms |
|---|---|---|---|---|
| 0.50 (default) | 0.729 | 0.565 | 27 | 13 |
| 0.40 | 0.672 | 0.661 | 21 | 20 |
| 0.30 | 0.588 | 0.806 | 12 | 35 |

## Run it
```bash
pip install pandas numpy scikit-learn matplotlib seaborn jupyter
jupyter notebook Diabetes_Logistic_Regression_ROC_AUC.ipynb
```
Run it from this folder; the notebook reads `DiabetesDataset/pima-indians-diabetes-new.csv` (a forward-slash path that works on Windows, Mac and Linux). The saved outputs were produced with Python 3.11 and scikit-learn 1.9.

## What I found
- **The baseline is a sound model.** It scores 0.807 on the test split, against 0.677 for always answering "no diabetes", and it does not overfit (training accuracy 0.767).
- **Cleaning the zeros and scaling did not improve the scores.** The "improved" pipeline fixed the convergence warning but scored slightly lower on this split, and the two models are equivalent across the 5 folds (the differences are smaller than the fold-to-fold variation). Plain logistic regression is not very sensitive to these steps on this data.
- **The single-split accuracy is a little optimistic:** cross-validated accuracy is about 0.77 to 0.78.
- **The decision threshold is the lever that matters.** Lowering it from 0.5 to 0.3 finds far more patients who have diabetes (recall 0.565 to 0.806) at the cost of more false alarms.
- **Zeros are really missing values.** Glucose, blood pressure, skin thickness, insulin and BMI contain zeros that cannot be real (for example 374 of 768 insulin values and 227 of 768 skin thickness values).

## Notes and next steps
- The original notebook text contained numbers copied from a tutorial that did not match its outputs. They have been corrected to the notebook's own results.
- The overfitting check that was planned in the original notebook has now been run.
- Next steps: try a random forest or gradient boosting, add feature interactions, and choose the threshold from the real cost of a missed case.
