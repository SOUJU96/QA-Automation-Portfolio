# Boston Housing: Linear Regression and EDA (Python)

A personal machine learning project that predicts house prices (`medv`) from the Boston Housing dataset using linear regression, with exploratory data analysis to try to improve the model.

## Files
| File | What it is |
|---|---|
| `Boston_Housing_Linear_Regression-EDA.ipynb` | The notebook: explanation, code and saved outputs |
| `Boston1.csv` | The dataset: 506 rows, 13 features plus the target `medv` |

## What the notebook covers
1. **Simple linear regression**: `lstat` (share of lower-status population) to `medv`, with a scatter plot and R² score.
2. **Multiple linear regression** on all features, then compared after:
   - dropping a collinear feature (`tax`), based on the correlation heatmap
   - removing outliers with the z-score method and with the IQR method
   - a reduced feature set (`rm`, `ptratio`, `lstat`, `tax`)
   - feature scaling with `StandardScaler`
3. **Random Forest Regressor** for comparison.
4. **Multicollinearity check** with the variance inflation factor (VIF).
5. **EDA**: correlation matrix and heatmap, distribution plot, box plots, pair plot.

Test R² scores saved in the notebook: simple linear regression about 0.52 (trained on only 10% of the data), multiple linear regression about 0.73, and about 0.73 after dropping `tax`.

## Run it
```bash
pip install pandas numpy matplotlib seaborn scikit-learn scipy statsmodels jupyter
jupyter notebook Boston_Housing_Linear_Regression-EDA.ipynb
```
Keep `Boston1.csv` in the same folder as the notebook; it is read with a relative path. Python 3.12 was used.

## Notes
- This is an older project, kept as written. Some cells use features that newer library versions have deprecated or changed. For example, `sns.distplot` is deprecated, and the saved output of the scatter plot cell (`sns.scatterplot(dataset['rad'], dataset['medv'])`) is an error because recent seaborn versions require keyword arguments (`x=`, `y=`).
- **About the dataset:** the Boston Housing dataset has well-known ethical problems. One of its columns (`black`) was constructed from the racial makeup of each town, and scikit-learn removed the dataset from its library for that reason. It is used here only as a classic teaching dataset for regression techniques, not as an example of good feature design.
