import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {Description, FinalResult, PieChartData, Result} from "../_model/Interfaces";
import {ControllerService} from "../_service/controller.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  description: Array<Description> = [
    {title: "systemAnalysisFinancialMarket", name: "Системний аналіз фінансового ринку", description: "Студент має освоїти методи математичного моделювання економічних об'єктів і процесів. Поглибити свої знання в області фінансів, а також вміти знаходити та аналізувати невідомі рішення математичних моделей. Фахівець даної спеціалізації має ґрунтовні фінансові та економічні знання в сукупності з математичним моделюванням, тому він з легкістю може працювати фінансовим аналітиком. В будь-якій фінансовій установі, в державній або комерційній організації"},
    {title: "systemAnalysisAndManagement", name: "Системний аналіз і управління", description: "Метою даної спеціалізації є підготовка фахівця, який буде вирішувати проблеми системного аналізу у своїй професійній діяльності. Після завершення навчання фахівець зможе з легкістю працювати у сфері інформатизації. Приймати участь у різного виду дослідженнях та розробці. Бути першокласним викладачем"},
    {title: "intelligentServiceOrientedDistributedComputing", name: "Інтелектуальні сервіс-орієнтовані розподілені обчислювання", description: "Підготовка фахівця, здатного вирішувати задачі з галузі комп’ютерних наук, пов’язані з розробкою програмних продуктів, баз даних, систем штучного інтелекту, адмініструванням систем та мереж. Фахівець в цій області з легкістю може адмініструвати системи, базі даних, конфігурувати мережі. Бути інженером-програмістом, а також тестувати програмне забезпечення"},
    {title: "artificialIntelligenceSystems", name: "Системи і методи штучного інтелекту", description: "Метою є вивчення основних напрямків досліджень сучасної теорії штучного інтелекту. Фахівець даної спеціалізації має ґрунтовні знання в математиці й аналізі, а тому може працювати будь де. Впровадження штучного інтелекту можливе майже в кожній області, саме тому такий фахівець буде затребуваний"}];
  displayDescription: Description = {title: "IASA",name: "" , description: "Будь-ласка, заповніть необхідні дані і натисніть Розрахувати результат"};
  data: PieChartData [] = [{
    title: 'IASA',
    name: 'ІПСА',
    y: 100,
  }];
  result: Result;
  constructor(private controllerService: ControllerService) {
  }

  ngOnInit(): void {

    let id: number = +sessionStorage.getItem("id");

    this.showResult();

  }

  checkRule() {
    let id: number = +sessionStorage.getItem("id");
    this.controllerService.getStudentResult(id).subscribe((data: Result) => {
      console.log(data);

    });
    console.log(this.data);
  }

  showResult() {

    let id: number = +sessionStorage.getItem("id");
    this.controllerService.showFinalResult(id).subscribe((data:FinalResult) => {
      if (data.studentId != 0) {
        console.log("HERE!!!");
        this.data = [];
        let result = data.artificialIntelligenceSystems + data.intelligentServiceOrientedDistributedComputing
          + data.systemAnalysisAndManagement + data.systemAnalysisFinancialMarket;
        this.data.push({
          title: "systemAnalysisFinancialMarket",
          name: "Системний аналіз фінансового ринку",
          y: (data.systemAnalysisFinancialMarket / result)*100
        });
        this.data.push({
          title: "systemAnalysisAndManagement",
          name: "Системний аналіз і управління",
          y: (data.systemAnalysisAndManagement / result)*100
        });
        this.data.push({
          title: "intelligentServiceOrientedDistributedComputing",
          name: "Інтелектуальні сервіс-орієнтовані розподілені обчислювання",
          y: (data.intelligentServiceOrientedDistributedComputing / result)*100
        });
        this.data.push({
          title: "artificialIntelligenceSystems",
          name: "Системи і методи штучного інтелекту",
          y: (data.artificialIntelligenceSystems / result)*100
        });
        console.log(this.data);
      }
    })
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Діаграма відношень спеціалізацій по результатам розрахунку'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Specializations',
        colorByPoint: true,
        data: this.data
      }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

    let tmp = 0;
    let specTitle = "";
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].y > tmp) {
        tmp = this.data[i].y;
        specTitle = this.data[i].title;
      }
    }
    this.description.forEach(spec => {
      if (spec.title ===specTitle) {
        this.displayDescription = spec;
      }
    })
  }
}
