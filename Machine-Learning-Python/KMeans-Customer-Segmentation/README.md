# Customer segmentation with K-means clustering (Python)

A personal machine learning project that groups mall customers into segments by annual income and spending score using K-means clustering, first with a K-means class written from scratch and then with scikit-learn, and then checks the two against each other.

## Files
| File | What it is |
|---|---|
| `K_means_clustering.ipynb` | The notebook: algorithm steps, code, saved outputs and plots |
| `Mall_Customers.csv` | The dataset: 200 customers with `CustomerID`, `Genre`, `Age`, `Annual Income (k$)` and `Spending Score (1-100)` |

## Data
The widely used "Mall Customers" dataset (a public teaching dataset with 200 synthetic customer records, available on Kaggle): 112 women and 88 men, aged 18 to 70, with annual income from 15 to 137 (thousand dollars) and a spending score from 1 to 99 assigned by the mall. K-means is **unsupervised**, so there is no "correct answer" column; the goal is to find natural groups.

## What the notebook does
1. Explains the K-means steps: pick starting centroids, assign every point to its nearest centroid, move each centroid to the average of its points, and repeat.
2. Defines a `Kmeans` class that does this from scratch with NumPy, with k-means++ starting centroids. The class header credits an original author ("purandur", December 2018); the class is adapted from existing code, and the changes made to it are listed in its header.
3. Uses `Annual Income (k$)` and `Spending Score (1-100)` as features.
4. Uses the **elbow method** (within-cluster sum of squares, WCSS, for K = 1 to 10) to choose the number of clusters, and picks **K = 5**.
5. Plots the five clusters with their centroids.
6. Repeats the elbow method and the clustering with scikit-learn's `KMeans`.
7. **Fixes and checks the from-scratch class:** compares its WCSS with scikit-learn for K = 1 to 10, tests stability over many seeds, checks that both methods find the same clusters, and confirms K = 5 with the **silhouette score**.
8. Profiles the five customer segments.

## Results: five customer segments
| Segment | Customers | Avg income (k$) | Avg spending score | Avg age |
|---|---|---|---|---|
| Low income, high spending | 22 | 25.7 | 79.4 | 25 |
| Low income, low spending | 23 | 26.3 | 20.9 | 45 |
| Middle income, middle spending | 81 | 55.3 | 49.5 | 43 |
| High income, high spending | 39 | 86.5 | 82.1 | 33 |
| High income, low spending | 35 | 88.2 | 17.1 | 41 |

For business use, the "high income, low spending" group is the interesting one: customers who could spend more but don't.

**From-scratch class vs scikit-learn** (WCSS, lower is better):

| K | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| From scratch | 269,981 | 181,364 | 106,348 | 73,680 | 44,448 | 37,266 | 30,273 | 25,337 | 23,265 | 19,788 |
| scikit-learn | 269,981 | 181,364 | 106,348 | 73,680 | 44,448 | 37,234 | 30,241 | 25,036 | 21,917 | 20,072 |

At K = 5 both find the same five groups (adjusted Rand index 1.0, identical cluster sizes). The silhouette score also peaks at K = 5 (0.554; K = 6 is close at 0.540).

## Run it
```bash
pip install numpy pandas matplotlib scikit-learn jupyter
jupyter notebook K_means_clustering.ipynb
```
Run it from this folder; the notebook reads `Mall_Customers.csv` with a relative path. The saved outputs were produced with Python 3.11 and scikit-learn 1.9.

## What I fixed in the from-scratch class
The first version had these problems, found by testing it; all are fixed and the notebook was re-run:
- **Starting centroids were not true k-means++:** the distance to *all* chosen centroids was added up instead of using the distance to the *nearest* one.
- **Centroids were integers** (the data is integer), so they were rounded down after every update. The data and centroids are now floats.
- **Empty clusters** (3 of 20 runs at K = 8 and 8 of 20 at K = 10 in my tests) gave `NaN` centroids and `RuntimeWarning` messages. An empty cluster is now re-seeded with the point farthest from its centroid.
- **No random seed and a single start:** results changed on every run, and the saved elbow curve was a poor, bumpy run (about 67,000 at K = 5 instead of 44,450). The class now takes `random_state` and restarts `n_init = 10` times, keeping the best run.
- **A rare crash:** `randint(0, n)` includes `n`, so about 1 run in 200 chose a row that does not exist.
- It was also hard-coded for two features and now works with any number.

## Notes and next steps
- **A single start can still land in a poor solution.** With one start at K = 5, results ranged from 44,448 to 92,312 across 20 seeds. This is normal for K-means and is why the restarts matter. (Checked separately over 300 seeds: about two thirds of single-start runs came within 1% of the best result, against about 80% for scikit-learn, which uses a greedy variant of k-means++.)
- K-means gives a good local solution, not a guaranteed best one, which is why the two methods differ slightly at K = 6 to 10.
- Only two features are used. Trying Age and Genre (with scaling), and comparing with hierarchical clustering or DBSCAN, would show whether the segments change.
- Cluster numbers differ between the two methods, so "cluster 1" in one plot is not the same group as "cluster 1" in the other.
