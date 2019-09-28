# GOAL

The goal of this project is to provide a simple way to load data from a json file and generate interactive plots in the most language agnostic manner. If possible all the steps needed to transform the data are described in a compact *template* text format that can be interpreted in various languages, such as JavaScript (for in-browser plots),  python and C++. 
You can try the interactive example [here](https://martinresearch.github.io/Json2Plot/)

**do we really need to support other languages than JavaScript ?** 
	
Not necessarily, but being able to reuse the same syntax to do json-to-tidyframe conversion from python (see section about tidy frames below) in order to do more complex processing with pandas for example would be a nice feature. The json-to-tidyframe template could even be embedded in the json files.	
	

## Combining Plotly and JMESpath

[Plotly](https://plot.ly/) is an open-source JavaScript plotting library with interfaces in Python and R. [JMESpath](http://jmespath.org/) is a json query language specification with implementation in various languages. 

By combining this two tools and some JavaScript we are able to create a page that allows to interactively generate plots from a json file in the browser. 

The figure is described using the Ploly.js json format but the fields containing the data we want to plot are not array of numbers but strings starting with the $ character that correspond to JMESPath queries in the data. 
Our JavaScript code walks through the json describing the figure and replace each string starting by $ by the result of theJMESPath query on the data.

Here is a simple example (you can try the interactive example [here](https://martinresearch.github.io/Json2Plot/))

data:
	
	[{"year":2010,"price":50},{"year": 2011,"price":58},{"year": 2012,"price":63},{"year": 2013,"price":61}]

*Plotly* fomat containing *JMESPath* queries :
	
	{
	"data":[{
		"x": "$[*].year",
		"y": "$[*].price",
		"mode": "lines+markers"
		}],
	"layout":{}
	}
gives:

![plot](example.png)
## Converting json data to tidy frames

[Tidy dataframes](http://www.jeannicholashould.com/tidy-data-in-python.html) are dataframes formated in a specific way that makes subsequent data visualization easier to generate. We could try to split the processing pipline into two steps: a json-to-tidyframe conversion and then a tidy-frame-to-plot using something like [ploty express](https://plot.ly/python/plotly-express/).
In order to assist in doing the conversion to the tidy datafrale, we could use some automatization similar to [json2table](http://json2table.com) or [json-to-csv](https://konklone.io/json/) (code [here](https://github.com/konklone/json)),
but we would need to port this tool to all the languages we want to target. 
 
## Alternatives

### supporting only JavaScript 

If  supporting python an c++ an python is not really a concern, what are the best tools to assist in creating plot using data from a json file that would allow to export the resulting generated code or template file ? 

### using python's pandas library

Using python to transform the json data into panda dataframes is not considered as valid option here as we want to be able to make the conversion in the browser.
In the future there could be a port of pandas to JavaScript with the same API (maybe [panda-js](https://github.com/StratoDem/pandas-js)) and a declarative description format based on that API to describe a sequence of operations that be interpreted by pandas both in python and JavaScript. Or maybe we could run pandas in a python interpreter that run in the browser ? Could https://github.com/iodide-project/pyodide/ be a viable option ?

### using XSLT

We could convert the json to xml using json-to-xml, use xslt to transform the data structure format that corresponds to plotly structure (but in xml) and then convert back to json using xml-to-json. There is an example of such an approach, without the plot part [here](https://www.xml.com/articles/2017/02/14/why-you-should-be-using-xslt-30/)
For this approach to be language agnostic we could use json-to-from-xml converters in [javascript](https://goessner.net/download/prj/jsonxml/), [C++](https://github.com/Cheedoong/xml2json) and [python](https://pypi.org/project/xmljson/), but the conversion from and to json will need to be consistent across languages. Also as visible [here](https://www.xml.com/articles/2017/02/14/why-you-should-be-using-xslt-30/) the xslt format is quite verbose. Are they interactive tools to assist in writing the xslt file? 

