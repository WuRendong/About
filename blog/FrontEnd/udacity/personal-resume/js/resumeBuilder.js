var bio = {
	"name": "Aaron Wu",
	"role": "Web Developer",
	"contacts": {
		"mobile": "13812345678",
		"email": "wurendong@hotmail.com",	
		"github": "https://github.com/wurendong",
		"twitter": "https://twitter.com/RendongWu",
		"location": "Beijing",
		"weibo": "http://www.weibo.com/wurendong",
		"facebook": "https://www.facebook.com/aaron.wu.7796"
	},
	"welcomeMessage": "Welcome to visit my resume!",
	"biopic": "http://placekitten.com/g/300/400",
	"skills": [
		{
			"name": "Programming",
			"value": 0.85
		},
		{
			"name": "UI design",
			"value": 0.60
		},
		{
			"name": "Project Management",
			"value": 0.75
		},
		{
			"name": "Team Management",
			"value": 0.65
		}
	],

	"display": function() {
		// 1. display bio picture and profile text, such as name, role and welecome message
		var formattedPic = HTMLbioPic.replace("%data%", bio.biopic);
		var formattedName = HTMLheaderName.replace("%data%", bio.name);
		formattedName = HTMLiamText + formattedName;
		var formattedRole = HTMLrole.replace("%data%", bio.role);
		var formattedMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
		$("#header").prepend(HTMLprofile);
		$("#profile").prepend(formattedPic, HTMLProfileText);
		$("#profile-text").append(formattedName, formattedRole, formattedMsg);


		// 2. display contacts
		$("#header").append(HTMLContact);
		$("#contact").append(HTMLContactHead);

		// Move TopContacts div into contact div
  		$("#topContacts").appendTo("#contact");
		$("#contact").append(HTMLtopSns);
		$("#lets-connect").append(HTMLfooterSns);
		
		$.each(bio.contacts, function(name, value) {
			var formattedTopContact = "";
			var formattedTopSns = "";
			if (name == "mobile") {
				contactValue = HTMLContactValue.replace("%data%", value)
				formattedTopContact = HTMLContactItem.replace("%data%", HTMLmobileIcon + contactValue);
			} else if (name == "email") {
				contactValue = HTMLContactValue.replace("%data%", value)
				formattedTopContact = HTMLContactItem.replace("%data%", HTMLemailIcon + contactValue);
			} else if (name == "location") {
				contactValue = HTMLContactValue.replace("%data%", value)
				formattedTopContact = HTMLContactItem.replace("%data%", HTMLlocation + contactValue);
			} else if (name == "github") {
				formattedTopSns = HTMLContactValueIconOnly.replace("%data%", HTMLgithubIcon).replace("#", value);
			} else if (name == "twitter") {
				formattedTopSns = HTMLContactValueIconOnly.replace("%data%", HTMLtwittterIcon).replace("#", value);
			} else if (name == "facebook") {
				formattedTopSns = HTMLContactValueIconOnly.replace("%data%", HTMLfacebookIcon).replace("#", value);
			} else if (name == "weibo") {
				formattedTopSns = HTMLContactValueIconOnly.replace("%data%", HTMLweiboIcon).replace("#", value);
			}

			if (formattedTopContact != "") {
				$("#topContacts, #footerContacts").append(formattedTopContact);
			}

			if (formattedTopSns != "") {
				$("#topSns, #footerSns").append(formattedTopSns);
			}
		});

		// 3. display skill
		$("#header").after(HTMLSkillSection);
		$("#skill-section").append(HTMLskillsHead, HTMLskills);
		var index = 0;
		bio.skills.forEach(function(skill) {
			$("#skill-list:last").append(HTMLskill.replace("%data%", skill.name).replace("%html%", HTMLskillProgress).replace("%id%", "skill" + index));
			$('#skill' + index).circleProgress({
	    		value: skill.value,
	    		size: 80,
	    		fill: {
	      			gradient: ["#001f3f", "#0074D9", "#7FDBFF"]
	    		}
	  		}).on('circle-animation-progress', function(event, progress, v) {
	    		$(this).children('.value').html(Math.round(v * 100) + '<i>%</i>');
	  		});
	  		index += 1;
		});
	}
};

var aboutme = {
	description: "I'm a Software Engineer with more than 10 years of experience related to mobile software development, more than 6 years of experience in Android software development, more than 5 years of experience for telephony development and app development, around 1.5 years of experience for RCS(Rich communication service) module, have more than 1 years experience of leading technical team and managing project, know well about app development base on Android, mature, responsible, good team worker, self-motivated, quick learner and strong problem solving skills. Fluent in both Mandarin and English.",

	display: function() {
		$("#top-nav").after(HTMLAboutMe);
		$("#about-me").append(HTMLAboutMeHead, HTMLAboutMeContent.replace("%data%", aboutme.description));
	}
}

var navbar = {
	"tabs": [
		{
			"name": "Home",
			"target": "#header"
		},
		{
			"name": "Skills Glance",
			"target": "#skill-section"
		},
		{
			"name": "Work Experience",
			"target": "#workExperience"
		},
		{
			"name": "Projects",
			"target": "#projects"
		},
		{
			"name": "Education",
			"target": "#education"
		},
		{
			"name": "My Location",
			"target": "#mapDiv"
		}
	],

	display: function() {
		index = 0;
		$("#skill-section").before(HTMLnav);
		navbar.tabs.forEach(function(tab) {
			if (index == 0) {
				$(".nav").append(HTMLtabActive.replace("%data%", tab.name).replace("#", tab.target));
			} else {
				$(".nav").append(HTMLtab.replace("%data%", tab.name).replace("#", tab.target));
			}
			index += 1;		
		});

        var menu = document.querySelector('#menu');
        var main = document.querySelector('#main');
        var drawer = document.querySelector('.nav');

        menu.addEventListener('click', function(e) {
          drawer.classList.toggle('open');
          e.stopPropagation();
        });
        main.addEventListener('click', function() {
          drawer.classList.remove('open');
        });
	}
}

var education = {
	"schools": [
		{
			"name": "BTBU",
			"location": "Beijing",
			"degree": "BA",
			"majors": ["Automation"],
			"dates": "2003 - 2007",
			"url": "http://www.btbu.edu.cn"
		}
	],
	"onlineCourses": [
		{
			"title": "Font-End",
			"school": "Udacity",
			"dates": "2017-08-16",
			"url": "https://cn.udacity.com/course/front-end-web-developer-nanodegree--nd001-cn-basic"
		},
		{
			"title": "DeepLearning",
			"school": "Udacity",
			"dates": "2017-09-03",
			"url": "https://cn.udacity.com/course/deep-learning-nanodegree-foundation--nd101"
		}
	],
	"display": function() {
		$("#education").append(HTMLtimeline);
		education.schools.forEach(function(school) {
			$(".timeline:last").append(HTMLschoolStart);
			var formattedSchoolName = HTMLschoolName.replace("%data%", school.name);
			var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
			var formattedSchoolDegree = formattedSchoolName + formattedDegree;
			$(".education-entry:last").append(HTMLtimelineEntryTitle.replace("%data%", formattedSchoolDegree.replace("#", school.link)).replace("%data2%", school.dates), HTMLtimelineEntryBody.replace("%data%", "Majors:"));
			var combinedMajors = "";
			school.majors.forEach(function(major) {
				$(".timeline-entry-details:last").append(HTMLtimelineEntryDetail.replace("%data%", major));
			});	
		});

		if (education.onlineCourses.length != 0) {
			$("#education").append(HTMLonlineClasses);
			$("#education").append(HTMLtimeline);
			
		}
		education.onlineCourses.forEach(function(course) {
			$(".timeline:last").append(HTMLschoolStart);
			var formattedTitle = HTMLonlineTitle.replace("%data%", course.title);
			var formattedSchool = HTMLonlineSchool.replace("%data%", course.school);
			var formattedDates = HTMLonlineDates.replace("%data%", course.dates);
			var formattedUrl = HTMLonlineURL.replace("%data%", course.url);
			$(".education-entry:last").append(HTMLtimelineEntryTitle.replace("%data%", formattedTitle + formattedSchool).replace("%data2%", course.dates), HTMLtimelineEntryBody.replace("%data%", "URL:"));
			var urlItems = course.url.split("|");
			urlItems.forEach(function(item) {
				$(".timeline-entry-details:last").append(item);
			});	
		});
	}
};

var work = {
	"jobs": [
		{
			"employer": "LeEco",
			"link": "http://www.leeco.com/",
			"title": "Senior Software Engineer",
			"location": "Beijing",
			"dates": "July, 2016 - Future",
			"summary": "Be responsible for Telephony",
			"description": "1. Code maintain.|2. New feature implementation.|3. Patch management.|4. Requirement analyze."
		},
		{
			"employer": "Sony Mobile Communication",
			"link": "https://www.sonymobile.com/",
			"title": "Software Architect",
			"location": "Beijing",
			"dates": "December, 2010 - Jule, 2016",
			"summary": "Be responsible for Telephony and RCS stack",
			"description": "1. Code maintain.|2. New feature implementation.|3. Patch management.|4. Requirement analyze"
		},
		{
			"employer": "Winks",
			"link": "http://www.winksi.com/",
			"title": "Software Engineer",
			"location": "Beijing",
			"dates": "October, 2009 - November, 2010",
			"summary": "Be responsible for engine development",
			"description": "1.Analyze requirement from custome.|2. Develop new feature in engine module.|3.Maintain engine module"
		}
	],
	"display": function() {
		$("#workExperience").append(HTMLtimeline);
		work.jobs.forEach(function(job) {
			$(".timeline:last").append(HTMLworkStart);
			var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer).replace("#", job.link);
			$(".work-entry:last").append(HTMLtimelineEntryTitle.replace("%data%", formattedEmployer).replace("%data2%", job.title), HTMLtimelineEntryBody.replace("%data%", job.summary));
			$(".title:last").append(HTMLtimelineEntryAddtionInfo.replace("%data%", job.dates), HTMLtimelineEntryAddtionInfo.replace("%data%", job.location));
			var descriptionItems = job.description.split("|");
			descriptionItems.forEach(function(item) {
				$(".timeline-entry-details:last").append(HTMLtimelineEntryDetail.replace("%data%", item));
			});
		});
	}
};

var projects = {
	"projects": [
		{
			"title": "Developer Thinking",
			"link": "https://github.com/WuRendong/wurendong.github.io/tree/master/blog/FrontEnd/udacity/developer-thinking",
			"dates": "Augest, 2017",
			"summary": "A mail to myself",
			"description": "1. What's your expectation for this course?|2. What's the state of mind when you start this course?|3. How will you conque the problem during the course?",
			"images": ["images/project1-400_small.png"]
		},
		{
			"title": "Blog Post",
			"link": "https://github.com/WuRendong/wurendong.github.io/tree/master/blog/FrontEnd/udacity/blog-post",
			"dates": "Augest, 2017",
			"summary": "Make a blog post as a Web",
			"description": "1. Making a post web with HTML5.|2. Learn about relative technical specification.",
			"images": ["images/project2-400_small.png"]
		},
		{
			"title": "Animal Business Card",
			"link": "https://github.com/WuRendong/wurendong.github.io/tree/master/blog/FrontEnd/udacity/animal-business-card",
			"dates": "Septemper, 2017",
			"summary": "Make a Animal Business Card",
			"description": "1. Make a web as requirement with HTML5 and CSS3.|2. Learn about relative technial specification.",
			"images": ["images/project3-400_small.png"]
		}
	],
	"display": function() {
		$("#projects").append(HTMLtimeline);
		projects.projects.forEach(function(project) {
			$(".timeline:last").append(HTMLprojectStart);
			var formattedProjectTitle = HTMLprojectTitle.replace("%data%", project.title).replace("#", project.link);
			$(".project-entry:last").append(HTMLtimelineEntryTitle.replace("%data%", formattedProjectTitle).replace("%data2%", project.dates), HTMLtimelineEntryBody.replace("%data%", project.summary));
			var descriptionItems = project.description.split("|");
			descriptionItems.forEach(function(item) {
				$(".timeline-entry-details:last").append(HTMLtimelineEntryDetail.replace("%data%", item));
			});
			project.images.forEach(function(image) {
				$(".timeline-entry-images:last").append(HTMLtimelineEntryImage.replace("%data%", image));
			});	
		});
	}
};

// Display all the components
bio.display();
navbar.display();
aboutme.display();
work.display();
projects.display();
education.display();
$("#mapDiv").append(googleMap);
$("#map").css("height", "400px");
$("#map").css("width", "90%");


// Update Conatact Div when screen resize
$(window).resize(function(){
	updateContactDiv();
});

updateContactDiv();

function updateContactDiv() {
  if ($(window).width() <= 600) {
   	if($("#header").has("#contact")) {
   		$('#contact').appendTo('#about-me-body');
   	}
  } else {
  	if ($("#about-me-body").has("#contact")) {
  		$('#contact').appendTo('#header');
  	}
  }
}

// Update Nav bar according to scrolling position
var navTop = $('.nav').offset().top;
var skillsTop = $("#skill-section").offset().top;
var lastTop = $("#mapDiv").offset().top;
var lastHeight = $("#mapDiv").height();

$(window).scroll(function() {
	updateNavTab();
});

function updateNavTab() {
	var scrollTop = $(window).scrollTop();
	if (scrollTop > navTop) {
		$(".nav").addClass("navbar-fixed-top navbar-default").css("max-width: 300px;");
	} else {
		$(".nav").removeClass("navbar-fixed-top navbar-default");
	}

	var firstEle = $("#top-nav ul li").first();
	// Currently bootstrap bar height is 52, as it will overlay a piece of screen, so it should be discounted
	var navbarHeight = 52;
	scrollTop += navbarHeight;
    $('#top-nav > ul > li > a').each(function () {
        var curLink = $(this);
        var refElem = $(curLink.attr('href'));
        var eleTop = refElem.position().top;
        var eleBottom = eleTop + refElem.height();
        //Compare the value of current position and the every section position in each scroll
        if (eleTop <= scrollTop && eleBottom > scrollTop) {
            //Remove class active in all nav
            $('#top-nav > ul > li').removeClass("active");
            //Add class active
            curLink.parent().addClass("active");
        } else if (scrollTop < skillsTop) {
        	// This block it for the area that is not considered in logic above, eg. "about me section"
        	// and the blank area over the header, both of them, "Home" tab should be active
        	$('#top-nav > ul > li').removeClass("active");
        	firstEle.addClass("active");
        } else if ((scrollTop > lastTop + lastHeight) && (eleBottom == lastTop + lastHeight)) {
        	$('#top-nav > ul > li').removeClass("active");
			curLink.parent().addClass("active");
        } else {
            curLink.parent().removeClass("active");
        }
    });
}
