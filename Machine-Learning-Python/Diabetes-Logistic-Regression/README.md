# Diabetes prediction: logistic regression, confusion matrix and ROC/AUC (Python)

A personal machine learning project that predicts whether a patient has diabetes from eight medical measurements, using logistic regression, and evaluates it with a confusion matrix, accuracy, precision, recall and the ROC curve with AUC.

## Files
| File | What it is |
|---|---|
| `Diabetes_Logistic_Regression_ROC_AUC.ipynb` | The notebook: explanation, code and saved outputs |
| `DiabetesDataset/pima-indians-diabetes-new.csv` | The data the notebook reads (768 rows, no header row) |
| `DiabetesDataset/diabetes.csv` | The same 768 rows with column names |
| `DiabetesDataset/diabetes_Metadata.xlsx` | The same 768 rows as an Excel sheet (despite the name, it holds the data, not a description of the columns) |

## Data
The Pima Indians Diabetes dataset, a well-known public dataset (National Institute of Diabetes and Digestive and Kidney Diseases, widely shared through UCI and Kaggle): 768 women of Pima Indian heritage, aged 21 or older. Each row has `Pregnancies`, `Glucose`, `BloodPressure`, `SkinThickness`, `Insulin`, `BMI`, `DiabetesPedigreeFunction`, `Age` and the outcome (1 = diabetes, 0 = no diabetes). About 35% of rows are positive. Results from this one population should not be generalised to other groups.

## What the notebook does
1. Loads the data and names the columns.
2. Splits it 75/25 into training and test sets (`random_state=0`).
3. Trains a `LogisticRegression` model with default settings.
4. Evaluates it with a confusion matrix (also as a heatmap), accuracy, precision, recall and a classification report.
5. Plots the **ROC curve** from the predicted probabilities and calculates the **AUC**.

## Results saved in the notebook
Test set of 192 patients:

| Measure | Value |
|---|---|
| Accuracy | 0.807 |
| Precision (diabetes) | 0.745 |
| Recall (diabetes) | 0.613 |
| F1 (diabetes) | 0.67 |
| AUC | about 0.86 (stated in the notebook text; the curve is plotted) |

Confusion matrix (rows are actual no and yes, columns are predicted no and yes): 117 and 13, then 24 and 38.

## Run it
```bash
pip install pandas numpy scikit-learn matplotlib seaborn jupyter
jupyter notebook Diabetes_Logistic_Regression_ROC_AUC.ipynb
```
The notebook reads the data with the Windows-style path `DiabetesDataset\pima-indians-diabetes-new.csv`, which works on Windows when you run it from this folder. On Mac or Linux, change the backslash to a forward slash: `DiabetesDataset/pima-indians-diabetes-new.csv`. Python 3.12 was used.

## Notes and what I would improve
- **Zeros are really missing values.** `Glucose`, `BloodPressure`, `SkinThickness`, `Insulin` and `BMI` contain zeros that cannot be real measurements (for example 374 of 768 insulin values and 227 skin thickness values are 0). The notebook keeps them as they are. Replacing them with the median or another imputed value, or adding a "missing" flag, would likely improve the model.
- **Convergence warning:** the model reports that it did not converge. Scaling the features (for example with `StandardScaler`) or raising `max_iter` fixes this.
- **Compare with a baseline:** about 68% of the test patients do not have diabetes, so always predicting "no" scores about 68%. The model's 81% is better, but it is worth saying.
- **Recall is the weak spot (61%):** the model misses about four in ten patients who do have diabetes. For a screening use, I would lower the decision threshold using the ROC curve to catch more cases, accepting more false alarms.
- **Overfitting was not checked:** the notebook plans to compare training and test accuracy but does not compute the training accuracy. Cross-validation would give a steadier estimate than one split.
- **Some explanation text does not match the outputs.** A few markdown cells carry numbers from a tutorial (for example "119 and 36 are correct, 26 and 11 are incorrect", precision 76%, recall 58%). The saved outputs above are the ones to trust.
