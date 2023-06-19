import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.tsa.statespace.sarimax import SARIMAX
import numpy as np
from pmdarima.arima import auto_arima


def predictTimeSeries(startDate):
    pd.set_option('display.max_columns', None)
    pd.set_option('display.max_rows', None)

    activityReports = pd.read_csv("ActivityReports.csv")

    activityReports['Date'] = pd.to_datetime(activityReports['Date'], format='%Y-%m-%d')
    activityReports = activityReports.set_index('Date')

    # Create a complete date range
    date_range = pd.date_range(start=activityReports.index.min(), end=activityReports.index.max(), freq='D')

    # Reindex the DataFrame with the complete date range
    activityReports = activityReports.reindex(date_range)

    sns.set()

    train = activityReports[activityReports.index < pd.to_datetime(startDate, format='%Y-%m-%d')]
    test = activityReports[activityReports.index >= pd.to_datetime(startDate, format='%Y-%m-%d')]

    plt.plot(train.index, train["Pay"], color="black", label='Training')
    plt.plot(test.index, test["Pay"], color="red", label='Testing')
    plt.ylabel('Pay')
    plt.xlabel('Date')
    plt.xticks(rotation=45)
    plt.title("Train/Test split for Activity Reports Data")

    y = train['Pay']

    # ARMA model
    ARMAmodel = auto_arima(y, start_p=1, start_q=1, max_p=3, max_q=3, d=None, trace=False, error_action='ignore',
                           suppress_warnings=True, stepwise=True, seasonal=False)

    # ARIMA model with differencing
    d = 1  # Differencing order
    ARIMAmodel = auto_arima(y, start_p=0, start_q=0, max_p=3, max_q=3, d=d, trace=False, error_action='ignore',
                            suppress_warnings=True, stepwise=True, seasonal=False)

    # SARIMA model
    try:
        SARIMAXmodel = SARIMAX(y, order=(2, 1, 2), seasonal_order=(1, 1, 1, 12), initialization='approximate_diffuse')
        SARIMAXmodel_fit = SARIMAXmodel.fit(disp=False)
        pred = SARIMAXmodel_fit.get_prediction(start=test.index.min(), end=test.index.max())
        y_pred_df = pd.DataFrame(index=test.index)
        y_pred_df["SARIMA_Predictions"] = pred.predicted_mean
    except Exception as e:
        print("SARIMA model fitting failed:", str(e))

    # Assign ARMA predictions to the DataFrame
    arma_predictions = ARMAmodel.predict(n_periods=len(test))
    arma_nan = np.full(len(test) - len(arma_predictions), np.nan)
    y_pred_df["ARMA_Predictions"] = np.concatenate([arma_nan, arma_predictions])

    # Assign ARIMA predictions to the DataFrame
    arima_predictions = ARIMAmodel.predict(n_periods=len(test) + d)
    arima_nan = np.full(len(test) + d - len(arima_predictions), np.nan)
    y_pred_df["ARIMA_Predictions"] = np.concatenate([arima_nan, arima_predictions[d:]])

    # Plotting the predictions
    plt.plot(y_pred_df.index, y_pred_df["ARMA_Predictions"], color='green', label='ARMA Predictions')
    plt.plot(y_pred_df.index, y_pred_df["ARIMA_Predictions"], color='blue', label='ARIMA Predictions')
    if 'SARIMAXmodel_fit' in locals():
        plt.plot(y_pred_df.index, y_pred_df["SARIMA_Predictions"], color='orange', label='SARIMA Predictions')

    plt.legend()
    plt.show()

    # Merge predictions with complete date range and fill missing values with zeros
    predictions_df = pd.DataFrame({'Date': date_range})
    predictions_df = predictions_df.merge(y_pred_df, how='left', left_on='Date', right_index=True)
    predictions_df.fillna('', inplace=True)

    # Reorder the columns
    predictions_df = predictions_df[['Date', 'ARMA_Predictions', 'ARIMA_Predictions', 'SARIMA_Predictions']]

    # Save predictions to a CSV file
    predictions_df.to_csv('predictions.csv', index=False)


predictTimeSeries("2023-07-17")