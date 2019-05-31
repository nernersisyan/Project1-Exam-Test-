import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private http: HttpClient) {
  }

  getTests() {
    return this.http.get('http://localhost:3000/source');
  }

  addData(name, surname, fathersname, orgName, item, counter, showAnswers) {
    let newData = {
      'name': name,
      'surname': surname,
      'fathersname': fathersname,
      'orgName': orgName,
      'result': {
        'testNumber': item + 1,
        'question1': showAnswers[0],
        'question2': showAnswers[1],
        'question3': showAnswers[2],
        'question4': showAnswers[3],
        'question5': showAnswers[4],
        'question6': showAnswers[5],
        'points': counter
      }
  }
    ;
    return this.http.post('http://localhost:3000/personalInfo', newData);

  }

}
