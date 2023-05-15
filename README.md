# tttassignment

## React Histogram Component

This React component is a simple histogram that displays the 20 most frequently occurring words in the given text file. The data is fetched from the URL and the component uses the Chart.js library to visualize the data in a bar chart.

### Libraries Used
- Chart.js: a popular library for creating charts and graphs in JavaScript. It is easy to use and highly customizable, making it a popular choice for web developers who need to display data in a visual format.
- react-chartjs-2: a React wrapper for the Chart.js library. It provides a set of React components        that make it easy to use Chart.js within a React application.

### Components

The component consists of two buttons and a chart container.

#### Button 1: Submit

The "Submit" button triggers the `fetchData` function, which fetches the text file from the specified URL and processes the data to find the top 20 most frequently occurring words. The resulting data is then passed to the `histogramData` state variable using the `setHistogramData` function.

#### Button 2: Export

The "Export" button triggers the `handleExport` function, which generates a CSV file containing the data from the histogram and prompts the user to download the file.

#### Chart Container

The chart container displays the bar chart generated using the `Bar` component from the `react-chartjs-2` library. The chart displays the 20 most frequently occurring words on the x-axis and their frequencies on the y-axis.



