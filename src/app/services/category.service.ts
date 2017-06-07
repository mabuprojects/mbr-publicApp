import {Injectable, EventEmitter} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import {Observable, ReplaySubject} from "rxjs";

import {Category} from "../model/category.component";
import {ConfigService} from "./configuration/config.service";
import {Exception} from "./exceptions/exception.component";
import {Router} from "@angular/router";



@Injectable()
export class CategoryService {

    categories: Category[];
    categoriesObservable: ReplaySubject<Category[]>;

    constructor(private http: Http, private configService: ConfigService, private router: Router) {
        this.categoriesObservable = new ReplaySubject(1);
    }



    getCategoriesObservable(): Observable<Category[]>{
        return this.categoriesObservable;
    }

    /**
     *Obtiene todos las categorias
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    getCategories(refresh: boolean = false): void {

        var request: boolean = true;

        if (this.categories) {
            request = false;
        }

        request = refresh ? true : request;

        if (request) {
            //No ha realizado la petición o quiere forzarla
            this.http.get(this.configService.getUrl('category'))
                .map(response => {
                    this.categories = response.json();
                    this.categoriesObservable.next(this.categories);
                })
                .catch(this.handleError.bind(this))
                .subscribe();
        }
    }

    /**
     * Actualizar categoria
     * @param category
     * @returns {Observable<R>}
     */
    updateCategory(category: Category): Observable<boolean> {
        let body = JSON.stringify(category);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.configService.getUrl('category'), body, options)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError.bind(this));
    }

    /**
     * Eliminar categoria
     * @param categoryId
     * @returns {Observable<R>}
     */
    deleteCategory(categoryId: number): Observable<boolean> {
        return this.http.delete(this.configService.getUrl('category') + `/${categoryId}`)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError.bind(this));
    }

    /**
     *Obtiene una categoria devolviendo su nombre
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    findCategoryByName(categoryName: string, refresh: boolean): Observable<Category> {
        if (!refresh && this.categories) {
            //Ya he realizado esta petición
            return Observable.of(this.categories.find(p => p.name === categoryName));
        } else {
            //No ha realizado la petición o quiere forzarla
            return this.http.get(this.configService.getUrl('category'))
                .map(response => {
                    this.categories = response.json();
                    return this.categories.find(p => p.name === categoryName)
                })
                .catch(this.handleError.bind(this));
        }
    }


    /**
     * Crear categoria
     * @param categoryName
     * @returns {Observable<R>}
     */
    createCategory(categoryName: String): Observable<boolean> {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.configService.getUrl('category'), categoryName, options)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError.bind(this));
    }

    /**
     * Manejador de errores
     * @param error
     * @returns {any}
     */
    private handleError(error: Response) {
      if (error.status == 400) {
        return Observable.throw(error.json() as Exception);
      } else if (error.status == 0){
        this.router.navigate(['/error']);
      }
        return Observable.throw(error.json());

    }


}
