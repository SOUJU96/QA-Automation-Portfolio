# Customer segmentation with K-means clustering (Python)

A personal machine learning project that groups mall customers into segments by annual income and spending score using K-means clustering, first with a K-means class written from scratch and then with scikit-learn.

## Files
| File | What it is |
|---|---|
| `K_means_clustering.ipynb` | The notebook: algorithm steps, code, saved outputs and cluster plots |
| `Mall_Customers.csv` | The dataset: 200 customers with `CustomerID`, `Genre`, `Age`, `Annual Income (k$)` and `Spending Score (1-100)` |

## Data
The widely used "Mall Customers" dataset (a public teaching dataset with 200 synthetic customer records, available on Kaggle): 112 women and 88 men, aged 18 to 70, with annual income from 15 to 137 (thousand dollars) and a spending score from 1 to 99 assigned by the mall. K-means is **unsupervised**, so there is no "correct answer" column; the goal is to find natural groups.

## What the notebook does
1. Explains the K-means steps: pick starting centroids, assign every point to its nearest centroid, move each centroid to the average of its points, and repeat.
2. Defines a `Kmeans` class that does this from scratch with NumPy, including k-means++ style starting centroids. The class header credits an original author ("purandur", December 2018), so it is adapted from existing code and is included to study how the algorithm works.
3. Uses the two columns `Annual Income (k$)` and `Spending Score (1-100)` as features.
4. Uses the **elbow method** (within-cluster sum of squares for K = 1 to 10) to choose the number of clusters, and picks **K = 5**.
5. Plots the five clusters with their centroids.
6. Repeats the elbow method and the clustering with scikit-learn's `KMeans` (`k-means++`, `random_state=42`).

## Results: five customer segments
Profile of the scikit-learn clusters (averages per cluster):

| Segment | Customers | Avg income (k$) | Avg spending score | Avg age |
|---|---|---|---|---|
| Low income, high spending | 22 | 25.7 | 79.4 | 25 |
| Low income, low spending | 23 | 26.3 | 20.9 | 45 |
| Middle income, middle spending | 81 | 55.3 | 49.5 | 43 |
| High income, high spending | 39 | 86.5 | 82.1 | 33 |
| High income, low spending | 35 | 88.2 | 17.1 | 41 |

The scikit-learn within-cluster sum of squares at K = 5 is about 44,450, and the elbow in its curve is clear at 5. Cluster numbers differ between the two methods, so "cluster 1" in one plot is not the same group as "cluster 1" in the other. For business use, the "high income, low spending" group is the interesting one: customers who could spend more but don't.

## Run it
```bash
pip install numpy pandas matplotlib scikit-learn jupyter
jupyter notebook K_means_clustering.ipynb
```
Run it from this folder; the notebook reads `Mall_Customers.csv` with a relative path.

## Notes and what I would improve
I tested the from-scratch class and found several problems. The scikit-learn results are the reliable ones.
- **Elbow curve from the from-scratch class is bumpy.** The saved curve shows about 67,000 at K = 5 (scikit-learn: about 44,450). The class uses no random seed, so each run differs: over 40 runs at K = 5 the within-cluster sum of squares ranged from about 44,500 to 75,000 (median about 44,650), so the saved run was an unlucky one.
- **The starting-centroid selection is not true k-means++.** For each point it adds up the distance to *all* chosen centroids instead of taking the distance to the *nearest* one.
- **Centroids are stored as integers** (the data is integer), so each centroid is rounded down after every update.
- **Empty clusters** can appear at larger K (in my tests 3 of 20 runs at K = 8 and 8 of 20 at K = 10), which produces the saved `RuntimeWarning` messages and invalid centroids.
- **A rare crash:** `rd.randint(0, n)` includes `n`, so about 1 run in 200 picks an index that does not exist when choosing the first centroid.
- **Choosing K by eye is subjective.** Checked separately (not in the notebook), the silhouette score also peaks at K = 5 (0.554, against 0.540 at K = 6).
- **Only two features are used.** Age and gender are ignored; trying three features, or scaling the data, would show whether the segments change.
- The saved scikit-learn warning about a memory leak on Windows is harmless; it can be silenced with the environment variable `OMP_NUM_THREADS=1`.
