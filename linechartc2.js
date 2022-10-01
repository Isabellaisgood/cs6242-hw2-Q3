global_width = 1000,
global_height = 500;

// Dimensions
var margin = {top:100, right: 200, bottom: 50, left: 150};
var width = global_width - margin.left - margin.right,
    height = global_height - margin.top - margin.bottom;


//Appending second SVG element
var svg4 = d3.select("div#div4")
                .append("svg")
                .attr("id", "svg-c-2")
                .attr("width", global_width)
                .attr("height", global_height)
                .append("g")
                .attr("id", "plot-c-2")
                .attr("transform", "translate(80,20)");

//Chart Title
d3.select("svg#svg-c-2")
   .append("text")
   .attr("id", "title")
   .attr("x", width-450)
   .attr("y", height-300)
   .attr("font-size", "25px")
   .attr("stroke", "black")
   .text("Number of Ratings 2016-2020 (Log Scale)");
//Set colors using schemeCategory10
var colors = d3.schemeCategory10;

d3.dsv(",", "boardgame_ratings.csv", function(d){
    return{
        date: d3.timeParse("%Y-%m-%d")(d.date), //Parsing string to time obj
        Catan_count: +d["Catan=count"],
        Dominion_count: +d["Dominion=count"],
        Codenames_count: +d["Codenames=count"],
        Teraforming_Mars: +d["Terraforming Mars=count"],
        Gloomhaven_count: +d["Gloomhaven=count"],
        Magic_count: +d["Magic: The Gathering=count"],
        Dixit_count: +d["Dixit=count"],
        Monopoly_count: +d["Monopoly=count"],

        Catan_rank : +d["Catan=rank"],
        Codenames_rank : +d["Codenames=rank"],
        Mars_rank : +d["Terraforming Mars=rank"],
        Gloomhaven_rank : +d["Gloomhaven=rank"]


    }

    }).then(function(data){

        var timeFormatter = d3.timeFormat("%b %y") //format time

        var keys = ["Catan_count",
                    "Dominion_count",
                    "Codenames_count",
                    "Teraforming_Mars",
                    "Gloomhaven_count",
                    "Magic_count",
                    "Dixit_count",
                    "Monopoly_count"],

            data_dict = {"Catan_count": [],
                    "Dominion_count": [],
                    "Codenames_count": [],
                    "Teraforming_Mars": [],
                    "Gloomhaven_count": [],
                    "Magic_count": [],
                    "Dixit_count": [],
                    "Monopoly_count": []}

            all_values = [];

            for(i = 0; i < data.length; i++){
                for (j = 0; j < keys.length; j++){
                    all_values.push(data[i][keys[j]])
                    data_dict[keys[j]].push(data[i][keys[j]])

                }
            }

            console.log(data_dict)


        //Scales
        const xScale = d3.scaleTime().range([50, width]),
              yScale = d3.scaleLog().rangeRound([height, 50]);

        xScale.domain(d3.extent(data, function(d){
            return d.date})) // [Tue Nov 01 2016 00:00:00 GMT-0700 (Pacific Daylight Time), Sat Aug 01 2020 00:00:00 GMT-0700 (Pacific Daylight Time)]

        yScale.domain([1, 100000])


        //Declare x-axis and y-axis
        var xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.timeFormat("%b %y")),

            yaxis = d3.axisLeft(yScale)
                      .ticks(10);

        //Append axes
        d3.select("g#plot-c-2")
            .append("g")
            .attr("id", "x-axis-c-2")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        d3.select("g#plot-c-2")
            .append("g")
            .attr("id", "y-axis-c-2")
            .attr("class", "y axis")
            .attr("transform", "translate(50," + 0 + ")")
            .call(yaxis);

        // Add the text label for axes
        d3.select("g#x-axis-c-2")
           .append("text")
           .attr("id", "x_axis_label")
           .attr("x", width/2)
           .attr("y", height/8)
           .attr("font-size", "15px")
           .attr("text-anchor", "middle")
           .attr("stroke", "black")
           .text("Month");


       d3.select("g#y-axis-c-2")
         .append("text")
         .attr("id", "y_axis_label")
         .attr("transform", "rotate(-90)")
         .attr("x", -height/3)
         .attr("y", 35)
         .attr("dy", "-5.1em")
         .attr("font-size", "15px")
         .attr("text-anchor", "end")
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
                            .curve(d3.curveMonotoneX);


        lines.push(Monopoly_line);

        d3.select("g#plot-c-2")
            .append("g")
            .attr("id", "lines-c-2")

        //Add lines
        for (index = 0; index < lines.length; index++){
            d3.select("g#lines-c-2")
                .append("path")
                .datum(data)
                .style("stroke", colors[index])
                .attr("class", "line")
                .attr("d", lines[index])

        }


        //Collect Data for every third month
        scaled_data = []
        for(i = 0; i< data.length; i++){
            if((i+1) % 3 == 0){
                scaled_data.push(data[i])
            }

        }

        //Add symbols
        d3.select("g#plot-c-2")
           .append("g")
           .attr("id", "symbols-c-2").selectAll(".dots")
           .data(scaled_data)
           .enter()
           .append("circle")
               .style("fill", colors[0])
               .attr("class", "dot")
               .attr("cx", function(d){return xScale(d.date)})
               .attr("cy", function(d){return yScale(d.Catan_count)})
               .attr("r", 10)



        d3.select("g#symbols-c-2")
           .selectAll(".dots")
           .data(scaled_data)
           .enter()
           .append("circle")
            .style("fill", colors[2])
            .attr("class", "dot")
            .attr("cx", function(d){return xScale(d.date)})
            .attr("cy", function(d){return yScale(d.Codenames_count)})
            .attr("r", 10)


        d3.select("g#symbols-c-2")
           .selectAll(".dots")
           .data(scaled_data)
           .enter()
           .append("circle")
            .style("fill", colors[3])
            .attr("class", "dot")
            .attr("cx", function(d){return xScale(d.date)})
            .attr("cy", function(d){return yScale(d.Teraforming_Mars)})
            .attr("r", 10)


        d3.select("g#symbols-c-2")
            .selectAll(".dots")
            .data(scaled_data)
            .enter()
            .append("circle")
                .style("fill", colors[4])
                .attr("class", "dot")
                .attr("cx", function(d){return xScale(d.date)})
                .attr("cy", function(d){return yScale(d.Gloomhaven_count)})
                .attr("r", 10)


        //Add rank text
        d3.select("g#symbols-c-2")
            .append("g")
            .selectAll("circle")
            .data(scaled_data)
            .enter()
            .append("text")
                .attr("class", "circle_text")
                .attr("x", function(d){return + xScale(d.date) - 8 })
                .attr("y", function(d){return yScale(d.Catan_count) +2 })
                .text(function(d){
                    return d.Catan_rank
                })
                .style("font-size", "10px")
                .attr("fill", "white")


        d3.select("g#symbols-c-2")
            .append("g")
            .selectAll("circle")
            .data(scaled_data)
            .enter()
            .append("text")
                .attr("class", "circle_text")
                .attr("x", function(d){return + xScale(d.date) - 6 })
                .attr("y", function(d){return yScale(d.Codenames_count) +2 })
                .text(function(d){
                    return d.Codenames_rank
                })
                .style("font-size", "10px")
                .attr("fill", "white")


        d3.select("g#symbols-c-2")
            .append("g")
            .selectAll("circle")
            .data(scaled_data)
            .enter()
            .append("text")
                .attr("class", "circle_text")
                .attr("x", function(d){return xScale(d.date)- 2})
                .attr("y", function(d){return yScale(d.Teraforming_Mars) +2 })
                .text(function(d){
                    return d.Mars_rank
                })
                .style("font-size", "10px")
                .attr("fill", "white")



        d3.select("g#symbols-c-2")
            .append("g")
            .selectAll("circle")
            .data(scaled_data)
            .enter()
            .append("text")
                .attr("class", "circle_text")
                .attr("x", function(d){return xScale(d.date)- 7})
                .attr("y", function(d){return yScale(d.Gloomhaven_count) +2 })
                .text(function(d){
                    return d.Gloomhaven_rank
                })
                .style("font-size", "8px")
                .attr("fill", "white")


        //Add Ranks Legend
        d3.select("g#symbols-c-2")
           .append("circle")
           .attr("cx", width + 65)
           .attr("cy", height - 20)
           .attr("r", 25)
           .attr("stroke", "black")
           .attr("fill", "black")


        d3.select("g#symbols-c-2")
            .append("text")
            .attr("class", "Rank legend")
            .attr("x", width + 51)
            .attr("y", height - 15)
            .attr("fill", "white")
            .text("rank")


        d3.select("g#symbols-c-2")
            .append("text")
            .attr("class", "Rank legend")
            .attr("x", width + 22)
            .attr("y", height + 20)
            .attr("fill", "black")
            .text("BoardGameGeek Rank")

        //Add legends
        d3.select("g#lines-c-2")
            .selectAll("line")
            .data(data)
            .enter()
            .append("text")
            .attr("x", width + 5)
            .attr("y", function(d){return yScale(d3.max(data_dict["Catan_count"]))})
            .attr("fill", colors[0])
            .text("Catan")

        d3.select("g#lines-c-2")
            .selectAll("line")
            .data(data)
            .enter()
            .append("text")
            .attr("x", width+10)
            .attr("y", function(d){return yScale(d3.max(data_dict["Dominion_count"]))})
            .attr("fill", colors[1])
            .text("Dominion")


        d3.select("g#lines-c-2")
            .selectAll("line")
            .data(data)
            .enter()
            .append("text")
            .attr("x", width+10)
            .attr("y", function(d){return yScale(d3.max(data_dict["Codenames_count"]))})
            .attr("fill", colors[2])
            .text("Codenames")


        d3.select("g#lines-c-2")
            .selectAll("line")
            .data(data)
            .enter()
            .append("text")
            .attr("x", width+10)
            .attr("y", function(d){return yScale(d3.max(data_dict["Teraforming_Mars"]))})
            .attr("fill", colors[3])
            .text("Terraforming Mars")


        d3.select("g#lines-c-2")
            .selectAll("line")
            .data(data)
            .enter()
            .append("text")
            .attr("x", width+10)
            .attr("y", function(d){return yScale(d3.max(data_dict["Gloomhaven_count"]))})
            .attr("fill", colors[4])
            .text("Gloomhaven")

        d3.select("g#lines-c-2")
            .selectAll("line")
            .data(data)
            .enter()
            .append("text")
            .attr("x", width+10)
            .attr("y", function(d){return yScale(d3.max(data_dict["Magic_count"]))})
            .attr("fill", colors[5])
            .text("Magic: The Gathering")

        d3.select("g#lines-c-2")
            .selectAll("line")
            .data(data)
            .enter()
            .append("text")
            .attr("x", width+10)
            .attr("y", function(d){return yScale(d3.max(data_dict["Dixit_count"]))})
            .attr("fill", colors[6])
            .text("Dixit")

        d3.select("g#lines-c-2")
            .selectAll("line")
            .data(data)
            .enter()
            .append("text")
            .attr("x", width+10)
            .attr("y", function(d){return yScale(d3.max(data_dict["Monopoly_count"]))})
            .attr("fill", colors[7])
            .text("Monopoly")


    })