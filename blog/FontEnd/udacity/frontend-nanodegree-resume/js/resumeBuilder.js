var bio = {
	"name": "Aaron Wu",
	"role": "Web Developer",
	"contacts": {
		"mobile": "13812345678",
		"email": "wurendong@hotmail.com",	
		"github": "WuRendong</a>",
		"twitter": "@RendongWu",
		"location": "Beijing"
	},
	"welcomeMessage": "Welcome to my blog!",
	"biopic": "http://placekitten.com/g/200/200",
	"skills": ["Programming", "UI design", "Project Management", "Team Management"],

	"display": function() {
		var formattedName = HTMLheaderName.replace("%data%", bio.name);
		var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
		var formattedPic = HTMLbioPic.replace("%data%", bio.biopic);
		var formattedMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

		$("#header").prepend(formattedRole);
		$("#header").prepend(formattedName);
		$("#header").append(formattedPic);
		$("#header").append(formattedMsg);

		$.each(bio.contacts, function(name, value) {
			var formattedContact = HTMLcontactGeneric.replace("%contact%", name).replace("%data%", value);
			console.log("name: " + name + " value: " + value);
			$("#topContacts").append(formattedContact);
		});

		if (bio.skills.length != 0) {
			$("#header").append(HTMLskillsStart);
		}
		bio.skills.forEach(function(skill) {
			var formattedSkill = HTMLskills.replace("%data%", skill);
			$("#header").append(formattedSkill);
		});
	},

	"getContacts": function() {
		var combinedContacts = "";
		$.each(bio.contacts, function(name, value) {
			var formattedContact = HTMLcontactGeneric.replace("%contact%", name).replace("%data%", value);
			combinedContacts += formattedContact;
		});
		return combinedContacts;
	}
};

var education = {
	"schools": [
		{
			"name": "BTBU",
			"location": "Beijing",
			"degree": "BA",
			"majors": ["Automation"],
			"dates": "2003 - 2007",
			"url": "http://#"
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
		for (school in education.schools) {
			$("#education").append(HTMLschoolStart);
			var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
			var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
			var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
			var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);

			var combinedMajors = "";
			education.schools[school].majors.forEach(function(major) {
				combinedMajors += major + " ";
			});
			var formattedMajors = HTMLschoolMajor.replace("%data%", combinedMajors.trim());

			$(".education-entry:last").append(formattedSchoolName + formattedDegree);
			$(".education-entry:last").append(formattedDates);
			$(".education-entry:last").append(formattedLocation);
			$(".education-entry:last").append(formattedMajors);
		}

		if (education.onlineCourses.length != 0) {
			$("#education:last").append(HTMLonlineClasses);
		}
		for (course in education.onlineCourses) {
			$("#education").append(HTMLschoolStart);
			var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
			var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
			var formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
			var formattedUrl = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);
			$(".education-entry:last").append(formattedTitle + formattedSchool);
			$(".education-entry:last").append(formattedDates);
			$(".education-entry:last").append(formattedUrl);
		}
	}
};

var work = {
	"jobs": [
		{
			"employer": "LeEco",
			"title": "Senior Software Engineer",
			"location": "Beijing",
			"dates": "July, 2016 - Future",
			"description": "Be responsible for Telephony<br>1. Code maintain<br> 2. New feature implementation<br> 3. Patch management<br> 4. Requirement analyze"	
		},
		{
			"employer": "Sony Mobile Communication",
			"title": "Software Architect",
			"location": "Beijing",
			"dates": "December, 2010 - Jule, 2016",
			"description": "Be responsible for Telephony and RCS stack<br>1. Code maintain<br> 2. New feature implementation<br> 3. Patch management<br> 4. Requirement analyze"	
		},
		{
			"employer": "Winks",
			"title": "Software Engineer",
			"location": "Beijing",
			"dates": "October, 2009 - November, 2010",
			"description": "Engine team"	
		}
	],
	"display": function() {
		for (job in work.jobs) {
			$("#workExperience").append(HTMLworkStart);
			var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
			var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
			var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
			var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
			var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
			var formattedEmployerTitle = formattedEmployer + formattedTitle;
			console.log(formattedEmployerTitle);
			$(".work-entry:last").append(formattedEmployerTitle);
			$(".work-entry:last").append(formattedLocation);
			$(".work-entry:last").append(formattedDates);
			$(".work-entry:last").append(formattedDescription);
		}
	}
};

var projects = {
	"projects": [
		{
			"title": "Developer Thinking",
			"dates": "Augest, 2017",
			"description": "A mail to myself",
			"images": ["images/project1-400_small.png"]
		},
		{
			"title": "Blog Post",
			"dates": "Augest, 2017",
			"description": "Make a blog post as a Web",
			"images": ["images/project2-400_small.png"]
		},
		{
			"title": "Animal Business Card",
			"dates": "Septemper, 2017",
			"description": "Make a Animal Business Card",
			"images": ["images/project3-400_small.png"]
		}
	],
	"display": function() {
		for (project in projects.projects) {
			$("#projects").append(HTMLprojectStart);
			var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
			var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
			var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
			// var formattedImage = HTMLprojectImage;
			$(".project-entry:last").append(formattedProjectTitle);
			$(".project-entry:last").append(formattedDates);
			$(".project-entry:last").append(formattedDescription);
			projects.projects[project].images.forEach(function(image) {
				var formattedImage = HTMLprojectImage.replace("%data%", image);
				$(".project-entry:last").append(formattedImage);
			});
		}
	}
};

bio.display();
work.display();
projects.display();
education.display();
$("#mapDiv").append(googleMap);
$("#map").css("height", "400px");
$("#map").css("width", "90%");

$("#footerContacts").append(bio.getContacts());
