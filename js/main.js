document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Skills Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.progress-line span');
        
        const animateSkills = () => {
            skillBars.forEach(skill => {
                const percentage = skill.dataset.percent;
                skill.style.width = percentage + '%';
            });
        };

        // Intersection Observer for skills animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('.skills-visualization');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    // Testimonials Slider
    function initTestimonialsSlider() {
        const slider = document.querySelector('.testimonials-slider');
        const slides = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.prev-testimonial');
        const nextBtn = document.querySelector('.next-testimonial');
        
        if (!slider || !slides.length) return;

        let currentSlide = 0;
        const slideWidth = slides[0].offsetWidth;
        
        // Clone first and last slide
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        
        slider.appendChild(firstClone);
        slider.insertBefore(lastClone, slides[0]);
        
        slider.style.transform = `translateX(-${slideWidth}px)`;
        
        function goToSlide(index) {
            slider.style.transition = 'transform 0.5s ease-in-out';
            slider.style.transform = `translateX(-${slideWidth * (index + 1)}px)`;
            currentSlide = index;
        }
        
        function handleSlideChange() {
            if (currentSlide === slides.length) {
                slider.style.transition = 'none';
                currentSlide = 0;
                slider.style.transform = `translateX(-${slideWidth}px)`;
            }
            if (currentSlide === -1) {
                slider.style.transition = 'none';
                currentSlide = slides.length - 1;
                slider.style.transform = `translateX(-${slideWidth * slides.length}px)`;
            }
        }
        
        nextBtn.addEventListener('click', () => {
            if (currentSlide >= slides.length - 1) return;
            goToSlide(currentSlide + 1);
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentSlide <= 0) return;
            goToSlide(currentSlide - 1);
        });
        
        slider.addEventListener('transitionend', handleSlideChange);
        
        // Auto slide
        setInterval(() => {
            if (currentSlide >= slides.length - 1) return;
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    // Social Share Buttons
    function initSocialShare() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = window.location.href;
                const platform = button.dataset.platform;
                
                let shareUrl;
                switch(platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Check out Emanuel's professional portfolio!`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }

    // Newsletter Subscription
    function handleSubscribe(event) {
        event.preventDefault();
        
        const form = document.getElementById('subscribeForm');
        const nameInput = document.getElementById('subscribeName');
        const emailInput = document.getElementById('subscribeEmail');
        const interestInput = document.getElementById('subscribeInterest');
        const modal = document.getElementById('subscribeModal');
        
        // Basic validation
        if (!validateForm(nameInput, emailInput, interestInput)) {
            return false;
        }
        
        // Prepare the data
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            interest: interestInput.value
        };
        
        // Here you would typically send this data to your backend
        // For now, we'll just show the success modal
        console.log('Subscription data:', formData);
        
        // Show success modal
        showModal();
        
        // Reset form
        form.reset();
        
        return false;
    }

    function validateForm(nameInput, emailInput, interestInput) {
        let isValid = true;
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate interest
        if (interestInput.value === '') {
            showError(interestInput, 'Please select your primary interest');
            isValid = false;
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.innerText = message;
        
        formGroup.appendChild(error);
    }

    function clearErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const error = group.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        });
    }

    function showModal() {
        const modal = document.getElementById('subscribeModal');
        modal.style.display = 'block';
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal when clicking close button
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
    }

    function closeModal() {
        const modal = document.getElementById('subscribeModal');
        modal.style.display = 'none';
    }

    // ROI Calculator
    function initROICalculator() {
        const roiForm = document.getElementById('roiForm');
        const roiResults = document.getElementById('roiResults');
        const downloadReport = document.getElementById('downloadReport');
        let chart = null;

        if (roiForm) {
            roiForm.addEventListener('submit', function(e) {
                e.preventDefault();
                calculateROI();
            });
        }

        if (downloadReport) {
            downloadReport.addEventListener('click', generatePDFReport);
        }

        function calculateROI() {
            // Get form values
            const hardwareCost = Number(document.getElementById('hardwareCost').value);
            const installationCost = Number(document.getElementById('installationCost').value);
            const trainingCost = Number(document.getElementById('trainingCost').value);
            const maintenanceCost = Number(document.getElementById('maintenanceCost').value);
            const powerCost = Number(document.getElementById('powerCost').value);
            const laborSavings = Number(document.getElementById('laborSavings').value);
            const errorReduction = Number(document.getElementById('errorReduction').value);
            const productivityGain = Number(document.getElementById('productivityGain').value);
            const fuelSavings = Number(document.getElementById('fuelSavings').value);
            const years = Number(document.getElementById('years').value);

            // Calculate initial investment
            const totalInvestment = hardwareCost + installationCost + trainingCost;

            // Calculate annual costs
            const annualCosts = maintenanceCost + powerCost;

            // Calculate annual benefits
            const annualBenefits = laborSavings + errorReduction + productivityGain + fuelSavings;

            // Calculate net annual benefit
            const netAnnualBenefit = annualBenefits - annualCosts;

            // Calculate ROI metrics
            const totalBenefits = netAnnualBenefit * years;
            const roi = ((totalBenefits - totalInvestment) / totalInvestment) * 100;
            const paybackPeriod = totalInvestment / netAnnualBenefit * 12; // in months
            const netProfit = totalBenefits - totalInvestment;

            // Update results
            document.getElementById('roiPercentage').textContent = `${roi.toFixed(1)}%`;
            document.getElementById('paybackPeriod').textContent = `${paybackPeriod.toFixed(1)} months`;
            document.getElementById('netProfit').textContent = formatCurrency(netProfit);
            document.getElementById('annualSavings').textContent = formatCurrency(netAnnualBenefit);

            // Show results section
            roiResults.style.display = 'block';

            // Create chart
            createROIChart(years, totalInvestment, netAnnualBenefit);

            // Smooth scroll to results
            roiResults.scrollIntoView({ behavior: 'smooth' });
        }

        function createROIChart(years, initialInvestment, annualBenefit) {
            const ctx = document.getElementById('roiChart').getContext('2d');
            
            // Destroy existing chart if it exists
            if (chart) {
                chart.destroy();
            }

            // Generate data points
            const labels = Array.from({length: years + 1}, (_, i) => `Year ${i}`);
            const data = Array.from({length: years + 1}, (_, i) => {
                if (i === 0) return -initialInvestment;
                return -initialInvestment + (annualBenefit * i);
            });

            // Create new chart
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cumulative Return',
                        data: data,
                        borderColor: '#e67e22',
                        backgroundColor: 'rgba(230, 126, 34, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'ROI Projection Over Time'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Return: ${formatCurrency(context.parsed.y)}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return formatCurrency(value);
                                }
                            }
                        }
                    }
                }
            });
        }

        function generatePDFReport() {
            const doc = new jsPDF();
            
            // Add title
            doc.setFontSize(20);
            doc.text('ROI Analysis Report', 105, 20, { align: 'center' });
            
            // Add project details
            doc.setFontSize(12);
            doc.text('Project Details:', 20, 40);
            
            // Get all input values
            const inputs = document.querySelectorAll('#roiForm input, #roiForm select');
            let y = 50;
            
            inputs.forEach(input => {
                const label = document.querySelector(`label[for="${input.id}"]`).textContent;
                const value = input.value;
                doc.text(`${label}: ${value}`, 30, y);
                y += 10;
            });
            
            // Add results
            doc.text('Analysis Results:', 20, y + 10);
            y += 20;
            
            const results = [
                ['ROI Percentage:', document.getElementById('roiPercentage').textContent],
                ['Payback Period:', document.getElementById('paybackPeriod').textContent],
                ['Net Profit:', document.getElementById('netProfit').textContent],
                ['Annual Savings:', document.getElementById('annualSavings').textContent]
            ];
            
            results.forEach(result => {
                doc.text(`${result[0]} ${result[1]}`, 30, y);
                y += 10;
            });
            
            // Add chart as image
            const chartCanvas = document.getElementById('roiChart');
            const chartImage = chartCanvas.toDataURL('image/png');
            doc.addImage(chartImage, 'PNG', 20, y + 10, 170, 100);
            
            // Save the PDF
            doc.save('roi-analysis-report.pdf');
        }

        function formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        }
    }

    // ROI Calculator Advanced Features
    // Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabType = button.closest('.calculator-tabs, .results-tabs') ? 
                           button.closest('.calculator-tabs, .results-tabs').className : '';
            const tabName = button.dataset.tab;
            
            // Remove active class from all buttons in the same tab group
            button.closest('.calculator-tabs, .results-tabs')
                .querySelectorAll('.tab-btn')
                .forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const contentContainer = tabType.includes('calculator-tabs') ? 
                                   '.calculator-container' : '.results-content';
            const contents = document.querySelector(contentContainer)
                                   .querySelectorAll('.tab-content');
            
            contents.forEach(content => {
                content.classList.remove('active');
                if(content.dataset.tab === tabName) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Sensitivity Analysis
    const sensitivityForm = document.getElementById('sensitivityForm');
    if(sensitivityForm) {
        sensitivityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            runSensitivityAnalysis();
        });
    }

    // Scenario Comparison
    const comparisonForm = document.getElementById('comparisonForm');
    if(comparisonForm) {
        comparisonForm.addEventListener('submit', (e) => {
            e.preventDefault();
            compareScenarios();
        });
    }

    // Industry Metrics
    const industryForm = document.getElementById('industryForm');
    if(industryForm) {
        industryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateIndustryMetrics();
        });
    }

    // Chart Generation Functions
    function generateBreakEvenChart(data) {
        const ctx = document.getElementById('breakEvenChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Cumulative Cash Flow',
                    data: data.values,
                    borderColor: '#007bff',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function generateSensitivityChart(data) {
        const ctx = document.getElementById('sensitivityChart').getContext('2d');
        new Chart(ctx, {
            type: 'tornado',
            data: {
                labels: data.factors,
                datasets: [{
                    label: 'Impact on ROI',
                    data: data.impacts,
                    backgroundColor: data.impacts.map(impact => 
                        impact < 0 ? '#dc3545' : '#28a745'
                    )
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function generateCashFlowChart(data) {
        const ctx = document.getElementById('cashFlowChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.periods,
                datasets: [{
                    label: 'Cash Inflows',
                    data: data.inflows,
                    backgroundColor: '#28a745'
                }, {
                    label: 'Cash Outflows',
                    data: data.outflows,
                    backgroundColor: '#dc3545'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Analysis Functions
    function runSensitivityAnalysis() {
        const downtimeRisk = parseFloat(document.getElementById('downtimeRisk').value) / 100;
        const costOverrun = parseFloat(document.getElementById('costOverrun').value) / 100;
        const implementationDelay = parseInt(document.getElementById('implementationDelay').value);
        const fuelPriceVariation = parseFloat(document.getElementById('fuelPriceVariation').value) / 100;
        const laborCostTrend = parseFloat(document.getElementById('laborCostTrend').value) / 100;

        // Calculate impact on ROI
        const baseROI = calculateBaseROI();
        const impacts = {
            downtimeImpact: baseROI * (1 - downtimeRisk),
            costOverrunImpact: baseROI * (1 - costOverrun),
            delayImpact: baseROI * (1 - (implementationDelay / 12)),
            fuelPriceImpact: baseROI * (1 + fuelPriceVariation),
            laborCostImpact: baseROI * (1 + laborCostTrend)
        };

        // Update sensitivity chart
        const chartData = {
            factors: Object.keys(impacts),
            impacts: Object.values(impacts)
        };
        generateSensitivityChart(chartData);
    }

    function compareScenarios() {
        // Get values from both scenarios
        const scenario1 = getScenarioValues('1');
        const scenario2 = getScenarioValues('2');

        // Calculate ROI for both scenarios
        const roi1 = calculateROI(scenario1);
        const roi2 = calculateROI(scenario2);

        // Update comparison chart
        const chartData = {
            scenarios: ['IoT Automation', 'Traditional System'],
            values: [roi1, roi2]
        };
        updateComparisonChart(chartData);
    }

    function calculateIndustryMetrics() {
        const currentFuel = parseFloat(document.getElementById('currentFuelConsumption').value);
        const efficiency = parseFloat(document.getElementById('expectedEfficiency').value) / 100;
        const incidentCost = parseFloat(document.getElementById('incidentCost').value);
        const reduction = parseFloat(document.getElementById('expectedReduction').value) / 100;
        const currentMaintenance = parseFloat(document.getElementById('currentMaintenance').value);
        const maintenanceReduction = parseFloat(document.getElementById('expectedMaintenance').value) / 100;

        // Calculate savings
        const fuelSavings = currentFuel * efficiency * 12; // Annual fuel savings
        const safetySavings = incidentCost * reduction;
        const maintenanceSavings = currentMaintenance * maintenanceReduction;

        // Update industry metrics charts
        updateIndustryCharts({
            fuel: fuelSavings,
            safety: safetySavings,
            maintenance: maintenanceSavings
        });
    }

    // Export Functions
    document.getElementById('exportCharts').addEventListener('click', exportCharts);
    
    function exportCharts() {
        // Create a zip file containing all charts as images
        const charts = document.querySelectorAll('.chart');
        const zip = new JSZip();
        
        charts.forEach((chart, index) => {
            const dataUrl = chart.toDataURL('image/png');
            zip.file(`chart_${index + 1}.png`, dataUrl.split(',')[1], {base64: true});
        });
        
        zip.generateAsync({type: 'blob'})
           .then(content => {
               const url = window.URL.createObjectURL(content);
               const link = document.createElement('a');
               link.href = url;
               link.download = 'roi_analysis_charts.zip';
               link.click();
           });
    }

    // Report Generation
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const reportType = btn.dataset.report;
            generateReport(reportType);
        });
    });

    function generateReport(type) {
        const doc = new jsPDF();
        
        switch(type) {
            case 'executive':
                generateExecutiveSummary(doc);
                break;
            case 'detailed':
                generateDetailedAnalysis(doc);
                break;
            case 'custom':
                generateCustomReport(doc);
                break;
        }
        
        doc.save(`roi_${type}_report.pdf`);
    }

    function generateExecutiveSummary(doc) {
        doc.setFontSize(20);
        doc.text('ROI Analysis Executive Summary', 20, 20);
        
        doc.setFontSize(12);
        doc.text('Project Overview', 20, 40);
        // Add key metrics and charts
    }

    function generateDetailedAnalysis(doc) {
        doc.setFontSize(20);
        doc.text('Detailed ROI Analysis Report', 20, 20);
        
        // Add comprehensive analysis with all metrics and charts
    }

    function generateCustomReport(doc) {
        doc.setFontSize(20);
        doc.text('Custom ROI Analysis Report', 20, 20);
        
        // Add user-selected metrics and charts
    }

    // Initialize all features when DOM is loaded
    initSkillBars();
    initTestimonialsSlider();
    initSocialShare();
    initROICalculator();

    // ROI Calculator Initialization
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabType = button.closest('.calculator-tabs, .results-tabs') ? 
                           button.closest('.calculator-tabs, .results-tabs').className : '';
            const tabName = button.dataset.tab;
            
            // Remove active class from all buttons in the same tab group
            button.closest('.calculator-tabs, .results-tabs')
                .querySelectorAll('.tab-btn')
                .forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const contentContainer = tabType.includes('calculator-tabs') ? 
                                   '.calculator-container' : '.results-content';
            const contents = document.querySelector(contentContainer)
                                   .querySelectorAll('.tab-content');
            
            contents.forEach(content => {
                content.classList.remove('active');
                if(content.dataset.tab === tabName) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Initialize ROI Calculator Forms
    const sensitivityForm = document.getElementById('sensitivityForm');
    if(sensitivityForm) {
        sensitivityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            runSensitivityAnalysis();
        });
    }

    const comparisonForm = document.getElementById('comparisonForm');
    if(comparisonForm) {
        comparisonForm.addEventListener('submit', (e) => {
            e.preventDefault();
            compareScenarios();
        });
    }

    const industryForm = document.getElementById('industryForm');
    if(industryForm) {
        industryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateIndustryMetrics();
        });
    }

    // Export Charts Button
    const exportChartsBtn = document.getElementById('exportCharts');
    if(exportChartsBtn) {
        exportChartsBtn.addEventListener('click', exportCharts);
    }

    // Report Generation Buttons
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const reportType = btn.dataset.report;
            generateReport(reportType);
        });
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Newsletter Subscription form submission
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleSubscribe);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formData);
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Navbar scroll behavior
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});
