var margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
};

global_width = 1200,
global_height = 600;

// define the dimensions and margins for the graph
var width = global_width - margin.left - margin.right,
    height = global_height - margin.top - margin.bottom;


//Appending first SVG element
var svg1 = d3.select("div#div1")
            .append("svg")
            .attr("id", "svg-a")
            .attr('width', global_width)
            .attr('height', global_height)
            .append("g")
            .attr("transform", "translate(80,20)")
            .attr("id", "plot-a");

//Chart Title

d3.select('svg')
   .append('text')
   .attr('id', 'title')
   .attr("x", width-700)
   .attr('y', height-350)
   .attr('font-size', '25px')
   .attr("stroke", "black")
   .text("Number of Ratings 2016 - 2020");
//Set colors using schemeCategory10
var colors = d3.schemeCategory10;

d3.dsv(',', 'boardgame_ratings.csv', function(d){
    return{
        date: d3.timeParse("%Y-%m-%d")(d.date), //Parsing string to time obj
        Catan_count: +d['Catan=count'],
        Dominion_count: +d['Dominion=count'],
        Codenames_count: +d['Codenames=count'],
        Teraforming_Mars: +d['Terraforming Mars=count'],
        Gloomhaven_count: +d['Gloomhaven=count'],
        Magic_count: +d['Magic: The Gathering=count'],
        Dixit_count: +d['Dixit=count'],
        Monopoly_count: +d['Monopoly=count']

    }

    }).then(function(data){

        var timeFormatter = d3.timeFormat('%b %y') //format time

        var keys = ['Catan_count',
                    'Dominion_count',
                    'Codenames_count',
                    'Teraforming_Mars',
                    'Gloomhaven_count',
                    'Magic_count',
                    'Dixit_count',
                    'Monopoly_count'],

            data_dict = {'Catan_count': [],
                    'Dominion_count': [],
                    'Codenames_count': [],
                    'Teraforming_Mars': [],
                    'Gloomhaven_count': [],
                    'Magic_count': [],
                    'Dixit_count': [],
                    'Monopoly_count': []}

            all_values = [];

            for(i = 0; i < data.length; i++){
                for (j = 0; j < keys.length; j++){
                    all_values.push(data[i][keys[j]])
                    data_dict[keys[j]].push(data[i][keys[j]])

                }
            }


        //Scales
        const xScale = d3.scaleTime().range([50, width]),
              yScale = d3.scaleLinear().rangeRound([height, 50]);

        xScale.domain(d3.extent(data, function(d){
            return d.date}))

        yScale.domain([(0), d3.max(all_values)])


        //Declare x-axis and y-axis
        var xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.timeFormat('%b %y')),

            yaxis = d3.axisLeft(yScale)
                      .ticks(10);

        //Append axes
        d3.select('g#plot-a')
            .append('g')
            .attr('id', 'x-axis-a')
            .attr('class', 'x axis')
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        d3.select('g#x-axis-a')
           .append('text')
           .attr('class', 'x_axis_label')
           .attr('id', 'x_axis_label')
           .attr("x", width/2)
           .attr('y', height/8)
           .attr('font-size', '15px')
           .attr("text-anchor", "middle")
           .attr("stroke", "black")
           .text("Month");

        d3.select('g#plot-a')
            .append('g')
            .attr('id', 'y-axix-a')
            .attr('class', 'y axis')
            .attr("transform", "translate(50," + 0 + ")")
            .call(yaxis);

       d3.select('g#y-axix-a')
          .append('text')
          .attr('class', 'y_axis_label')
          .attr('id', 'y_axis_label')
          .attr("transform", "rotate(-90)")
          .attr("x", -200)
          .attr("y", 30)
          .attr('font-size', '15px')
          .attr("dy", "-5.1em")
          .attr("text-anchor", "middle")
          .attr("stroke", "black")
          .text("Number of Ratings");

        //Lines
        var lines = [];

        var Catan_line = d3.line()
                           .x(function(d){return xScale(d.date)})
                           .y(function (d) {return yScale(d.Catan_count)})
                           .curve(d3.curveMonotoneX);

        lines.push(Catan_line);

        var Dominion_line = d3.line()
                              .x(function(d){return xScale(d.date)})
                              .y(function(d){return yScale(d.Dominion_count)})
                              .curve(d3.curveMonotoneX);


        lines.push(Dominion_line);

        var Codenames_line = d3.line()
                              .x(function(d){return xScale(d.date)})
                              .y(function(d){return yScale(d.Codenames_count)})
                              .curve(d3.curveMonotoneX);

        lines.push(Codenames_line)

        var Mars_line = d3.line()
                          .x(function(d){return xScale(d.date)})
                          .y(function(d){return yScale(d.Teraforming_Mars)})
                          .curve(d3.curveMonotoneX);

        lines.push(Mars_line);

        var Gloomhaven_line = d3.line()
                                .x(function(d){return xScale(d.date)})
                                .y(function(d){return yScale(d.Gloomhaven_count)})
                                .curve(d3.curveMonotoneX);

        lines.push(Gloomhaven_line);

        var Magic_line = d3.line()
                            .x(function(d){return xScale(d.date)})
                            .y(function(d){return yScale(d.Magic_count)})
                            .curve(d3.curveMonotoneX);

        lines.push(Magic_line);

        var Dixit_line = d3.line()
                            .x(function(d){return xScale(d.date)})
                            .y(function(d){return yScale(d.Dixit_count)})
                            .curve(d3.curveMonotoneX);

        lines.push(Dixit_line);

        var Monopoly_line = d3.line()
                            .x(function(d){return xScale(d.date)})
                            .y(function(d){return yScale(d.Monopoly_count)})
                            .curve(d3.curveMonotoneX)

        lines.push(Monopoly_line);


        d3.select('g#plot-a')
            .append('g')
            .attr('id', 'lines-a')
        //Add lines
        for (index = 0; index < lines.length; index++){
            d3.select('g#lines-a')
                .append('path')
                .datum(data) //Binds data to the line
                .style("stroke", colors[index]) //Color
                .attr('class', 'line') // Assign a class for styling
                .attr('d', lines[index]) // Calls the line generator

        }

        //Add legends
        d3.select('g#lines-a')
            .selectAll('line')
            .data(data)
            .enter()
            .append('text')
            .attr('x', width + 5)
            .attr('y', function(d){return yScale(d3.max(data_dict['Catan_count']))})
            .attr('fill', colors[0])
            .text('Catan')

        d3.select('g#lines-a')
            .selectAll('line')
            .data(data)
            .enter()
            .append('text')
            .attr('x', width+10)
            .attr('y', function(d){return yScale(d3.max(data_dict['Dominion_count']))})
            .attr('fill', colors[1])
            .text('Dominion')


        d3.select('g#lines-a')
            .selectAll('line')
            .data(data)
            .enter()
            .append('text')
            .attr('x', width+10)
            .attr('y', function(d){return yScale(d3.max(data_dict['Codenames_count']))})
            .attr('fill', colors[2])
            .text('Codenames')


        d3.select('g#lines-a')
            .selectAll('line')
            .data(data)
            .enter()
            .append('text')
            .attr('x', width+10)
            .attr('y', function(d){return yScale(d3.max(data_dict['Teraforming_Mars']))})
            .attr('fill', colors[3])
            .text('Terraforming Mars')


        d3.select('g#lines-a')
            .selectAll('line')
            .data(data)
            .enter()
            .append('text')
            .attr('x', width+10)
            .attr('y', function(d){return yScale(d3.max(data_dict['Gloomhaven_count']))})
            .attr('fill', colors[4])
            .text('Gloomhaven')

        d3.select('g#lines-a')
            .selectAll('line')
            .data(data)
            .enter()
            .append('text')
            .attr('x', width+10)
            .attr('y', function(d){return yScale(d3.max(data_dict['Magic_count']))})
            .attr('fill', colors[5])
            .text('Magic: The Gathering')

        d3.select('g#lines-a')
            .selectAll('line')
            .data(data)
            .enter()
            .append('text')
            .attr('x', width+10)
            .attr('y', function(d){return yScale(d3.max(data_dict['Dixit_count']))})
            .attr('fill', colors[6])
            .text('Dixit')

        d3.select('g#lines-a')
            .selectAll('line')
            .data(data)
            .enter()
            .append('text')
            .attr('x', width+10)
            .attr('y', function(d){return yScale(d3.max(data_dict['Monopoly_count']))})
            .attr('fill', colors[7])
            .text('Monopoly')
        })