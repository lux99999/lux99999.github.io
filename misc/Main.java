
public class Main {

    public static void main(String args[]) {

        Circle circle1 = new Circle(10, "blue");    // Create three instances of Circle
        Circle circle2 = new Circle(20, "red");
        Circle circle3 = new Circle(30, "green");

        Circle.printCount();                        // Call static method to print the number of Circle instances

        circle1.print();                            // Call instance method to print the details of each instance
        circle2.print();
        circle3.print();
        
        Circle circle4 = new Circle(40, "purple");  // Create two more instances of Circle
        Circle circle5 = new Circle(50, "yellow");

        Circle.printCount();                        // Call static method to print the number of Circle instances

        circle4.print();                            // Call instance method to print the details of each instance
        circle5.print();

    } 
}

