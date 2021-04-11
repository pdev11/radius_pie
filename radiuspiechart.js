(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
     <!-- Styles -->
<style>
#chartdiv {
  width: 100%;
  height: 500px;
}

</style>


<div id="chartdiv"></div>
    `;

    customElements.define('com-sap-sample-piechart1', class WidgetTemplate extends HTMLElement {


		constructor() {
			super(); 
		
			let shadowRoot = this.attachShadow({mode: "open"});
			
			var my_awesome_script = document.createElement('script');
			my_awesome_script.setAttribute('src',"https://cdn.amcharts.com/lib/4/core.js");
			shadowRoot.appendChild(my_awesome_script);
			
			var my_awesome_script = document.createElement('script');
			my_awesome_script.setAttribute('src',"https://cdn.amcharts.com/lib/4/charts.js");
			shadowRoot.appendChild(my_awesome_script);
			
			var my_awesome_script = document.createElement('script');
			my_awesome_script.setAttribute('src',"https://cdn.amcharts.com/lib/4/themes/animated.js");

			shadowRoot.appendChild(my_awesome_script);
			shadowRoot.appendChild(tmpl.content.cloneNode(true));
			

					
			
		}


        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
        
        }
        */

        redraw(){
			
			let myChart = this.shadowRoot.getElementById('chartdiv');
						
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart
var chart = am4core.create(myChart, am4charts.PieChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = [
  {
    country: "Lithuania",
    value: 260
  },
  {
    country: "Czechia",
    value: 230
  },
  {
    country: "Ireland",
    value: 200
  },
  {
    country: "Germany",
    value: 165
  },
  {
    country: "Australia",
    value: 139
  },
  {
    country: "Austria",
    value: 128
  }
];

var series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "value";
series.dataFields.radiusValue = "value";
series.dataFields.category = "country";
series.slices.template.cornerRadius = 6;
series.colors.step = 3;

series.hiddenState.properties.endAngle = -90;

chart.legend = new am4charts.Legend();
// end am4core.ready()
        }
    
    
    });
        
})();
